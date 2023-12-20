import { TypeormDatabase, Store } from '@subsquid/typeorm-store';
import { In } from 'typeorm';
import * as ss58 from '@subsquid/ss58';

import * as albums from './abi/albums';
import { MintItems, Collections, Owner } from './model';

import { processor, SS58_PREFIX, ProcessorContext, Event } from './processor';

const encodeAddress = (address: string | Uint8Array) => {
    return ss58.codec(SS58_PREFIX).encode(address);
};

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async ctx => {
    let txs = extractCollectionsRecords(ctx);
    if (txs.length <= 0) {
        return;
    }

    console.log('txs', txs);
    const ownerIds = new Set<string>();
    txs.forEach(tx => {
        if (tx.from) {
            ownerIds.add(tx.from);
        }
        if (tx.to) {
            ownerIds.add(tx.to);
        }
    });

    const ownersMap = await ctx.store
        .findBy(Owner, {
            id: In([...ownerIds]),
        })
        .then(owners => {
            return new Map(owners.map(owner => [owner.id, owner]));
        });

    await ctx.store.save([...ownersMap.values()]);

    // Collections
    const collections = txs
        .filter(tx => tx.action === 'add')
        .map(tx => {
            return new Collections({
                id: tx.id,
                block: tx.block,
                uri: tx.uri,
                timestamp: tx.timestamp,
                from: tx.from,
                to: tx.to,
                songid: tx.song_id,
                albumid: tx.album_id,
                maxsupply: tx.max_supply,
                price: tx.price,
                contract: tx.contract,
            });
        });

    if (collections.length) {
        console.log('collections', collections);
        await ctx.store.insert(collections);
    }

    // Minted Items
    const mintItems = txs
        .filter(tx => tx.action === 'mint')
        .map(tx => {
            return new MintItems({
                id: tx.id,
                block: tx.block,
                uri: tx.uri,
                timestamp: tx.timestamp,
                from: tx.from,
                to: tx.to,
                songid: tx.song_id,
                albumid: tx.album_id,
                maxsupply: tx.max_supply,
                price: tx.price,
                contract: tx.contract,
            });
        });

    if (mintItems.length) {
        console.log('mintItems', mintItems);
        await ctx.store.insert(mintItems);
    }

    // Updated Items
    const updatedItems = txs
        .filter(tx => tx.action === 'updated')
        .map(tx => ({
            contract: tx.contract,
            from: tx.from,
            albumid: tx.album_id,
            songid: tx.song_id,
            uri: tx.uri,
            timestamp: tx.timestamp,
        }));

    if (updatedItems.length) {
        console.log('updatedItems', mintItems);
        const entities = await ctx.store.find(Collections, {
            where: updatedItems,
        });
        console.log('updated.entities', entities);
        if (entities && entities.length) {
            for (const entity of entities) {
                const item = updatedItems.find(
                    i =>
                        i.contract === entity.contract &&
                        i.from === entity.from &&
                        i.albumid === entity.albumid &&
                        i.songid === entity.songid
                );
                if (item) {
                    entity.uri = item.uri;
                    entity.updatedAt = item.timestamp;
                }
            }
            await ctx.store.save(entities);
        }
    }

    // Deleted Items
    const deletedItems = txs
        .filter(tx => tx.action === 'delete')
        .map(tx => ({
            contract: tx.contract,
            albumid: tx.album_id,
            songid: tx.song_id,
            timestamp: tx.timestamp,
        }));

    if (deletedItems.length) {
        console.log('deletedItems', deletedItems);
        const entities = await ctx.store.find(Collections, {
            where: deletedItems,
        });
        console.log('deleted.entities', entities);
        if (entities && entities.length) {
            // const entityIds = entities.map(entity => entity.id);
            // await ctx.store.remove(Collections, entityIds);

            for (const entity of entities) {
                const item = updatedItems.find(
                    i =>
                        i.contract === entity.contract &&
                        i.from === entity.from &&
                        i.albumid === entity.albumid &&
                        i.songid === entity.songid
                );
                if (item) {
                    entity.deletedAt = item.timestamp;
                }
            }
            await ctx.store.save(entities);
        }
    }
});

interface CollectionsRecord {
    id: string;
    from?: string;
    to?: string;
    block: number;
    timestamp: Date;
    uri: string;
    song_id: number;
    album_id: number;
    max_supply: number;
    price: bigint;
    action: string;
    contract: string;
}

function decodeEvent(event: Event) {
    try {
        return albums.decodeEvent(event.args.data);
    } catch (ex) {
        return null;
    }
}

function extractCollectionsRecords(
    ctx: ProcessorContext<Store>
): CollectionsRecord[] {
    const records: CollectionsRecord[] = [];
    for (const block of ctx.blocks) {
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted') {
                // console.log("event", event)
                const contract = event.args.contract;
                // console.log('contract', encodeAddress(contract));

                const album = decodeEvent(event);
                if (!album) {
                    continue;
                }
                console.log('album', album);

                // console.log('album.kind', album.__kind)
                // console.log('album.albumId', album.albumId, album.songId)

                if (album.__kind === 'ItemCreated') {
                    console.log('ItemCreated', album);
                    records.push({
                        id: event.id,
                        from: album.from && encodeAddress(album.from),
                        to: '',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri: album.uri,
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply: album.maxSupply,
                        price: album.price,
                        action: 'add',
                        contract: encodeAddress(contract),
                    });
                } else if (album.__kind === 'ItemDeleted') {
                    console.log('ItemDeleted', album);
                    records.push({
                        id: event.id,
                        from: '',
                        to: '',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri: '',
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply: 0,
                        price: BigInt(0),
                        action: 'delete',
                        contract: encodeAddress(contract),
                    });
                } else if (album.__kind === 'ItemMinted') {
                    console.log('ItemMinted', album);
                    records.push({
                        id: event.id,
                        from: album.from && encodeAddress(album.from),
                        to: album.to && encodeAddress(album.to),
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri: '',
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply: 0,
                        price: album.price,
                        action: 'mint',
                        contract: encodeAddress(contract),
                    });
                } else if (album.__kind === 'ItemUpdated') {
                    console.log('ItemUpdated', album);
                    records.push({
                        id: event.id,
                        from: album.from && encodeAddress(album.from),
                        to: '',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri: album.newUri,
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply: 0,
                        price: BigInt(0),
                        action: 'updated',
                        contract: encodeAddress(contract),
                    });
                }
            }
        }
    }
    return records;
}

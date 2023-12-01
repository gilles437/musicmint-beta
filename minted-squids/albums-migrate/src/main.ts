import {TypeormDatabase, Store} from '@subsquid/typeorm-store'
import {In} from 'typeorm'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'

import * as albums from "./abi/albums"
import {Account, Collections, Owner, Transfer} from './model'
import {events} from './types'
import { env } from 'process'

import {
    processor,
    SS58_PREFIX,
    ProcessorContext,
    Event
} from './processor'

const encodeAddress = (address: string | Uint8Array) => {
    return ss58.codec(SS58_PREFIX).encode(address)
}

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let txs = extractCollectionsRecords(ctx);
    if (txs.length <= 0) {
        return;
    }
    
    const ownerIds = new Set<string>()
    txs.forEach(tx => {
        if (tx.from) {
            ownerIds.add(tx.from)
        }
        if (tx.to) {
            ownerIds.add(tx.to)
        }
    })
 
    const ownersMap = await ctx.store.findBy(Owner, {
        id: In([...ownerIds])
    }).then(owners => {
        return new Map(owners.map(owner => [owner.id, owner]))
    })
 
    await ctx.store.save([...ownersMap.values()])

    const collections: Collections[] = [];
    txs.map(tx => {
        if (tx.action == 'add') {
            const collection = new Collections({
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
                contract: tx.contract
            })
            collections.push(collection);
        }
    })
    console.log('collections', collections)
    await ctx.store.insert(collections)

    let removeAdminItems: string[] = [];
    let removeSuperAdminItems: string[] = [];
    txs.map(tx => {
        if(tx.action == "delete") {
            //if(tx.contract && tx.contract != "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" ){
                removeAdminItems.push(tx.contract)
            //}
            // if(tx.contract == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" && tx.to){
            //  removeSuperAdminItems.push(tx.to);
            //}
        }
    })
    console.log({removeAdminItems})
    console.log({removeSuperAdminItems})

    const uniqueAdminArray = [...new Set(removeAdminItems)];
    console.log({uniqueAdminArray})
    const uniqueSuperAdminArray = [...new Set(removeSuperAdminItems)];
    console.log({uniqueSuperAdminArray})

    const transferAdminRemoveItem = await ctx.store.find(Transfer, {
        where:{
            contract: In([...uniqueAdminArray])
        }
    }).then(data => {
        return data;
    })
    console.log({transferAdminRemoveItem})
    await Promise.all(
        transferAdminRemoveItem.map(async (item)=>{
            await ctx.store.remove(Transfer, item.id)
        })
    )
})

interface CollectionsRecord {
    id: string
    from?: string
    to?: string
    block: number
    timestamp: Date
    uri: string
    song_id: number
    album_id: number
    max_supply: number
    price: bigint
    action:string
    contract: string
}

function decodeEvent(event: Event) {
    try {
        return albums.decodeEvent(event.args.data)
    } catch (ex) {
        return null;
    }
}

function extractCollectionsRecords(ctx: ProcessorContext<Store>): CollectionsRecord[] {
    const records: CollectionsRecord[] = []
    for (const block of ctx.blocks) {
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted') {
                console.log("event", event)
                const contract = event.args.contract;

                const album = decodeEvent(event.args.data)
                if (!album) {
                    continue;
                }
                console.log('album', album)
              
                console.log('album.kind', album.__kind)
                console.log('album.albumId', album.albumId, album.songId)

                if (album.__kind === 'ItemCreated') {
                    records.push({
                        id: event.id,
                        from: album.from && encodeAddress(album.from),
                        to: 'toto',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri: album.uri,
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply: album.maxSupply,
                        price: album.price,
                        action: "add",
                        contract: encodeAddress(contract),
                    })
                }
                else if (album.__kind === 'ItemDeleted') {
                    records.push({
                        id: event.id,
                        from: '',
                        to: 'toto',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri:'',
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply:0,
                        price: BigInt(0),
                        action: "delete",
                        contract: encodeAddress(contract),
                    })
                }
                else if (album.__kind === 'ItemMinted') {
                    records.push({
                        id: event.id,
                        from: album.from && encodeAddress(album.from),
                        to: album.to && encodeAddress(album.to),
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri:'',
                        song_id: album.songId,
                        album_id: album.albumId,
                        max_supply:0,
                        price: BigInt(0),
                        action: "mint",
                        contract: encodeAddress(contract),
                    })
                }
            }
        }
      }
    return records
}

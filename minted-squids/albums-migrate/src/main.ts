import {TypeormDatabase, Store} from '@subsquid/typeorm-store'
import {In} from 'typeorm'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'

import * as albums from "./abi/albums"
import {MintAlbums, MintSongs, Collections, Owner, Transfer} from './model'
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
    
    console.log("txs", txs)
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
    const mintAlbums: MintAlbums[] = [];
    const mintSongs: MintSongs[] = [];
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
        else if(tx.action == 'mint' && tx.song_id == 0){ //mint_album
            const mintAlbum = new MintAlbums({
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
            mintAlbums.push(mintAlbum);
        }
        else if(tx.action == 'mint' && tx.song_id != 0){ //mint_song
            const mintSong = new MintSongs({
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
            mintSongs.push(mintSong);
        }
    })
    if(collections.length){
        // console.log('collections', collections)
        await ctx.store.insert(collections)
    }

    if(mintAlbums.length){
        console.log('mintAlbums', mintAlbums)
        await ctx.store.insert(mintAlbums)
    }

    if(mintSongs.length){
        console.log('mintSongs', mintSongs)
        await ctx.store.insert(mintSongs)
    }

    let removeAlbumItems: Collections[] = [];
    let removeSongItems: Collections[] = [];
    await Promise.all(
        txs.map(async (tx) => {
            if(tx.action == 'delete'){
                const collectionsRemoveItem = await ctx.store.find(Collections, {
                    where:{
                        albumid: tx.album_id,
                        songid: tx.song_id,
                        contract: tx.contract
                    }
                }).then(data => {
                    return data;
                })
                console.log({collectionsRemoveItem})
                //delete_album
                if(tx.song_id == 0){
                    removeAlbumItems.concat(collectionsRemoveItem)
                }
                //delete_song
                else{
                    removeSongItems.concat(collectionsRemoveItem)
                }
            }
        })
    )
    console.log({removeAlbumItems})
    console.log({removeSongItems})

    const uniqueAlbumArray = [...new Set(removeAlbumItems)];
    console.log({uniqueAlbumArray})
    const uniqueSongArray = [...new Set(removeSongItems)];
    console.log({uniqueSongArray})

    await Promise.all(
        uniqueAlbumArray.map(async (item)=>{
            await ctx.store.remove(Collections, item.id)
        })
    )

    await Promise.all(
        uniqueSongArray.map(async (item)=>{
            await ctx.store.remove(Collections, item.id)
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
                // console.log("event", event)
                const contract = event.args.contract;
                // console.log('contract', encodeAddress(contract));

                const album = decodeEvent(event)
                if (!album) {
                    continue;
                }
                // console.log('album', album)
              
                // console.log('album.kind', album.__kind)
                // console.log('album.albumId', album.albumId, album.songId)

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
                    console.log("ItemDeleted", album)
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
                    console.log("ItemMinted", album)
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

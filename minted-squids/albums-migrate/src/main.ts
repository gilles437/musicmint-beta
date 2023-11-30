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
    ProcessorContext
} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let txs = extractCollectionsRecords(ctx);
    
    // let transferEvents: TransferEvent[] = getTransferEvents(ctx)

    // let accounts: Map<string, Account> = await createAccounts(ctx, transferEvents)
    // let transfers: Transfer[] = createTransfers(transferEvents, accounts)

    // await ctx.store.upsert([...accounts.values()])
    // await ctx.store.insert(transfers)

    // const ownerIds = new Set<string>()
    // txs.forEach(tx => {
    //     if (tx.from) {
    //         ownerIds.add(tx.from)
    //     }
    //     if (tx.to) {
    //         ownerIds.add(tx.to)
    //     }
    // })
 
    // const ownersMap = await ctx.store.findBy(Owner, {
    //     id: In([...ownerIds])
    // }).then(owners => {
    //     return new Map(owners.map(owner => [owner.id, owner]))
    // })
 
    // await ctx.store.save([...ownersMap.values()])

    // let transfers: Collections[] = [];
    // txs.map(tx => {
    //     if (tx.action == 'add') { 
    //         const transfer = new Collections({
    //             id: tx.id,
    //             block: tx.block,
    //             uri: tx.uri,
    //             timestamp: tx.timestamp,
    //             from: tx.from,
    //             to: tx.to,
    //             songid: tx.song_id,
    //             albumid: tx.album_id,
    //             maxsupply: tx.max_supply,
    //             price: tx.price,
    //             contract: tx.contract

    //         })
    //         transfers.push(transfer);
    //     }
        
    // })
    // console.log({transfers})
    // await ctx.store.insert(transfers)

    // let removeAdminItems: string[] = [];
    // let removeSuperAdminItems: string[] = [];
    // txs.map(tx => {
    //     if(tx.action == "delete"){
    //     //    if(tx.contract && tx.contract != "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" ){
    //             removeAdminItems.push(tx.contract)
    //       //  }
    //        // else if(tx.contract == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" && tx.to){
    //          //   removeSuperAdminItems.push(tx.to);
    //         //}
    //     }
    // })
    // console.log({removeAdminItems})
    // console.log({removeSuperAdminItems})

    // const uniqueAdminArray = [...new Set(removeAdminItems)];
    // console.log({uniqueAdminArray})
    // const uniqueSuperAdminArray = [...new Set(removeSuperAdminItems)];
    // console.log({uniqueSuperAdminArray})

    // const transferAdminRemoveItem = await ctx.store.find(Transfer, {
    //     where:{
    //         contract: In([...uniqueAdminArray])
    //     }
    // }).then(data => {
    //     return data;
    // })
    // console.log({transferAdminRemoveItem})
    // await Promise.all(
    //     transferAdminRemoveItem.map(async (item)=>{
    //         await ctx.store.remove(Transfer, item.id)
    //     })
    // )
})

interface TransferEvent {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    from: string
    to: string
    amount: bigint
    fee?: bigint
}
/*
function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
    // Filters and decodes the arriving events
    let transfers: TransferEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == events.balances.transfer.name) {
                let rec: {from: string; to: string; amount: bigint}
                if (events.balances.transfer.v1020.is(event)) {
                    let [from, to, amount] = events.balances.transfer.v1020.decode(event)
                    rec = {from, to, amount}
                }
                else if (events.balances.transfer.v1050.is(event)) {
                    let [from, to, amount] = events.balances.transfer.v1050.decode(event)
                    rec = {from, to, amount}
                }
                else if (events.balances.transfer.v9130.is(event)) {
                    rec = events.balances.transfer.v9130.decode(event)
                }
                else {
                    throw new Error('Unsupported spec')
                }

                assert(block.header.timestamp, `Got an undefined timestamp at block ${block.header.height}`)

                transfers.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: event.extrinsic?.hash,
                    from: ss58.codec('kusama').encode(rec.from),
                    to: ss58.codec('kusama').encode(rec.to),
                    amount: rec.amount,
                    fee: event.extrinsic?.fee || 0n,
                })
            }
        }
    }
    return transfers
}

async function createAccounts(ctx: ProcessorContext<Store>, transferEvents: TransferEvent[]): Promise<Map<string,Account>> {
    const accountIds = new Set<string>()
    for (let t of transferEvents) {
        accountIds.add(t.from)
        accountIds.add(t.to)
    }

    const accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then((accounts) => {
        return new Map(accounts.map((a) => [a.id, a]))
    })

    for (let t of transferEvents) {
        updateAccounts(t.from)
        updateAccounts(t.to)
    }

    function updateAccounts(id: string): void {
        const acc = accounts.get(id)
        if (acc == null) {
            accounts.set(id, new Account({id}))
        }
    }

    return accounts
}

function createTransfers(transferEvents: TransferEvent[], accounts: Map<string, Account>): Transfer[] {
    let transfers: Transfer[] = []
    for (let t of transferEvents) {
        let {id, blockNumber, timestamp, extrinsicHash, amount, fee} = t
        let from = accounts.get(t.from)
        let to = accounts.get(t.to)
        transfers.push(new Transfer({
            id,
            blockNumber,
            timestamp,
            extrinsicHash,
            from,
            to,
            amount,
            fee,
        }))
    }
    return transfers
}*/

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

function extractCollectionsRecords(ctx: ProcessorContext<Store>): CollectionsRecord[] {
    const records: CollectionsRecord[] = []
    for (const block of ctx.blocks) {
        for (const event of block.events) {
            console.log("event", event)
            if (event.name === 'Contracts.ContractEmitted') {
                const contract = event.args.contract;
 
                console.log("SS58_PREFIX", SS58_PREFIX)

                const album = albums.decodeEvent(event.args.data)
                console.log('event', album)
              
                console.log('event', album.__kind)
                console.log('event', album.albumId, album.songId)

                if (album.__kind === 'ItemCreated') {
                    records.push({
                        id: event.id,
                        from: album.from && ss58.codec(SS58_PREFIX).encode(album.from),
                        to: 'toto',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri:album.uri,
                        song_id:album.songId,
                        album_id:album.albumId,
                        max_supply:album.maxSupply,
                        price: album.price,
                        action:"add",
                        contract:"contract id"
                    })
                }
                if (album.__kind === 'ItemDeleted') {
                    records.push({
                        id: event.id,
                        from: '',
                        to: 'toto',
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri:'',
                        song_id:album.songId,
                        album_id:album.albumId,
                        max_supply:0,
                        price: BigInt(0),
                        action:"delete",
                        contract:"contract id"
                    })
                }

                if (album.__kind === 'ItemMinted') {
                    records.push({
                        id: event.id,
                        // from: album.from && ss58.codec(SS58_PREFIX).encode(album.from),
                        // to: album.to && ss58.codec(SS58_PREFIX).encode(album.to),
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp || 0),
                        uri:'',
                        song_id:album.songId,
                        album_id:album.albumId,
                        max_supply:0,
                        price: BigInt(0),
                        action:"mint",
                        contract:"contract id"
                    })
                }   
            }
        }
      }
    return records
}

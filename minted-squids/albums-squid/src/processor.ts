import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import * as albums from "./abi/albums"
import {Owner, Account, Collections, Transfer} from "./model"
import { BigNumber } from "@ethersproject/bignumber"
import { text } from "stream/consumers"


//the address of the deployed admins contract
const CONTRACT_ADDRESS_SS58 = '5FtcJFDK2TPAoAKx6gDMNR7cKmRZXgckHrW3txmev1fpvsCM'

const CONTRACT_ADDRESS = toHex(ss58.decode(CONTRACT_ADDRESS_SS58).bytes)
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix
  
const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: "https://archive-test-3.allfeat.io/graphql"
    })
    .addContractsContractEmitted(CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        }
    } as const)
 
type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>
 
processor.run(new TypeormDatabase(), async ctx => {
    const txs = extractCollectionsRecords(ctx)
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

    let transfers: Collections[] = [];
    txs.map(tx => {
        if (tx.action == 'add') { 
            const transfer = new Collections({
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
            transfers.push(transfer);
        }
        
    })
    console.log({transfers})
    await ctx.store.insert(transfers)

    let removeAdminItems: string[] = [];
    let removeSuperAdminItems: string[] = [];
    txs.map(tx => {
        if(tx.action == "delete"){
        //    if(tx.contract && tx.contract != "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" ){
                removeAdminItems.push(tx.contract)
          //  }
           // else if(tx.contract == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" && tx.to){
             //   removeSuperAdminItems.push(tx.to);
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

function extractCollectionsRecords(ctx: Ctx): CollectionsRecord[] {
    const records: CollectionsRecord[] = []
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            console.log('item block', item.name)
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = albums.decodeEvent(item.event.args.data)
                console.log('event',event)
              
                console.log ('event', event.__kind)
                console.log ('event', event.albumId, event.songId)

                if (event.__kind === 'ItemCreated') {
                    records.push({
                    id: item.event.id,
                    from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                    to: 'toto',
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    uri:event.uri,
                    song_id:event.songId,
                    album_id:event.albumId,
                    max_supply:event.maxSupply,
                    price: event.price,
                    action:"add",
                    contract:"contract id"

                    })
                }
                if (event.__kind === 'ItemDeleted') {
                    records.push({
                    id: item.event.id,
                    from: '',
                    to: 'toto',
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    uri:'',
                    song_id:event.songId,
                    album_id:event.albumId,
                    max_supply:0,
                    price: BigInt(0),
                    action:"delete",
                    contract:"contract id"

                    })
                }

                if (event.__kind === 'ItemMinted') {
                    records.push({
                    id: item.event.id,
                    from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                    to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    uri:'',
                    song_id:event.songId,
                    album_id:event.albumId,
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
 

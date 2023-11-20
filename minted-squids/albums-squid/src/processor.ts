import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import * as admin from "./abi/admin"
import * as albums from "./abi/albums"
import {Owner, Account, AlbumsAction, Transfer} from "./model"
import { BigNumber } from "@ethersproject/bignumber"

//address of a 0x0 address
const CONTRACT_OxO = '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM'

//the address of the deployed admins contract
//const CONTRACT_ADDRESS_SS58 = '5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG'
const CONTRACT_ADDRESS_SS58 = '5FVLyN1XCPwxEzxmVKRCArwa5yoqGZF4ABqf81HVaz1wPDsh'

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
    const txs = extractAlbumsActionRecords(ctx)
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

    let transfers: AlbumsAction[] = [];
    txs.map(tx => {
        if(tx.role != "None"){
            const transfer = new AlbumsAction({
                id: tx.id,
                amount: tx.amount,
                block: tx.block,
                role: tx.role,
                timestamp: tx.timestamp,
                contract: tx.contract,
                from: tx.from,
                to:tx.to
            })
            transfers.push(transfer);
        }
    })
    console.log({transfers})
    await ctx.store.insert(transfers)

    let removeAdminItems: string[] = [];
    let removeSuperAdminItems: string[] = [];
    txs.map(tx => {
        if(tx.role == "None"){
            if(tx.contract && tx.contract != CONTRACT_OxO ){
                removeAdminItems.push(tx.contract)
            }
            else if(tx.contract == CONTRACT_OxO && tx.to){
                removeSuperAdminItems.push(tx.to);
            }
        }
    })
    console.log({removeAdminItems})
    console.log({removeSuperAdminItems})

    const uniqueAdminArray = [...new Set(removeAdminItems)];
    console.log({uniqueAdminArray})
    const uniqueSuperAdminArray = [...new Set(removeSuperAdminItems)];
    console.log({uniqueSuperAdminArray})

    const transferAdminRemoveItem = await ctx.store.find(AlbumsAction, {
        where:{
            contract: In([...uniqueAdminArray])
        }
    }).then(data => {
        return data;
    })
    console.log({transferAdminRemoveItem})
    await Promise.all(
        transferAdminRemoveItem.map(async (item)=>{
            await ctx.store.remove(AlbumsAction, item.id)
        })
    )

    const transferSuperAdminRemoveItem = await ctx.store.find(AlbumsAction, {
        where:{
            to: In([...removeSuperAdminItems]),
            contract: CONTRACT_OxO
        }
    }).then(data => {
        return data;
    })
    await Promise.all(
        transferSuperAdminRemoveItem.map(async (item)=>{
            await ctx.store.remove(AlbumsAction, item.id)
        })
    )
})
 
interface AlbumsActionRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
    contract?: string
    role: string
}

function extractAlbumsActionRecords(ctx: Ctx): AlbumsActionRecord[] {
    const records: AlbumsActionRecord[] = []
    for (const block of ctx.blocks) {
        console.log('block', block)
        for (const item of block.items) {
            console.log('item block', item.name)
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = albums.decodeEvent(item.event.args.data)
                console.log('event',event)
           //     console.log('event.contract is ',event.contract && ss58.codec(SS58_PREFIX).encode(event.contract))

              
                console.log ('event', event.__kind)
                console.log ('event', event.albumId, event.songId)

              

                if (event.__kind === 'ItemCreated') {
                    records.push({
                    id: item.event.id,
                    from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                //    to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                    amount:BigInt(0),
                    role: "hello",
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
               //     contract: event.contract && ss58.codec(SS58_PREFIX).encode(event.contract)
                    })
                }
            }
        }
    }
    return records
}
 

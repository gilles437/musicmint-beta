import {In} from 'typeorm'
import assert from 'assert'

import * as ss58 from '@subsquid/ss58'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'

import * as admin from './abi/admin'
import {Owner, Transfer} from "./model"
import {
    processor,
    SS58_PREFIX,
    CONTRACT_ADDRESS,
    ProcessorContext
} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async ctx => {
    const txs = getTransferRecords(ctx)
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

    let transfers: Transfer[] = [];
    txs.map(tx => {
        if(tx.role != "None"){
            const transfer = new Transfer({
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
            if(tx.contract && tx.contract != "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" ){
                removeAdminItems.push(tx.contract)
            }
            else if(tx.contract == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" && tx.to){
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

    const transferSuperAdminRemoveItem = await ctx.store.find(Transfer, {
        where:{
            to: In([...removeSuperAdminItems]),
            contract: "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"
        }
    }).then(data => {
        return data;
    })
    await Promise.all(
        transferSuperAdminRemoveItem.map(async (item)=>{
            await ctx.store.remove(Transfer, item.id)
        })
    )
})

interface TransferRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
    contract?: string
    role: string
}

function getTransferRecords(ctx: ProcessorContext<Store>): TransferRecord[] {
    const records: TransferRecord[] = []
    for (const block of ctx.blocks) {
        for (const item of block.events) {
            if (item.name === 'Contracts.ContractEmitted' && item.args.contract === CONTRACT_ADDRESS) {
                const event = admin.decodeEvent(item.args.data)
                console.log('event',event)
                console.log('event.contract is ',event.contract && ss58.codec(SS58_PREFIX).encode(event.contract))
                if (event.__kind === 'Granted') {
                    records.push({
                    id: item.id,
                    from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                    to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                    amount:BigInt(0),
                    role: event.role.__kind,
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp || 0),
                    contract: event.contract && ss58.codec(SS58_PREFIX).encode(event.contract)
                    })
                }
            }
        }
    }
    return records
}

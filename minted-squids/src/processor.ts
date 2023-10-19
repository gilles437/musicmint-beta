import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import * as admin from "./abi/admin"
import {Owner, Transfer} from "./model"
import { BigNumber } from "@ethersproject/bignumber"
import {Account} from "./model/account.model"

const CONTRACT_ADDRESS_SS58 = 'Gi87hxpo6FvawjZocgxpUECXznEc1qCveGE7U3tgYChVktA'

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
    const txs = extractTransferRecords(ctx)
 
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
 
    const transfers = txs.map(tx => {
        const transfer = new Transfer({
            id: tx.id,
            amount: tx.amount,
            block: tx.block,
            timestamp: tx.timestamp,
            contract: tx.contract,
        })
 
        if (tx.from) {
            transfer.from = ownersMap.get(tx.from)
            if (transfer.from == null) {
                transfer.from = new Owner({id: tx.from, balance: 0n})
                ownersMap.set(tx.from, transfer.from)
            }
            transfer.from.balance -= tx.amount
        }
 
        if (tx.to) {
            transfer.to = ownersMap.get(tx.to)
            if (transfer.to == null) {
                transfer.to = new Owner({id: tx.to, balance: 0n})
                ownersMap.set(tx.to, transfer.to)
            }
            transfer.to.balance += tx.amount
        }
 
        return transfer
    })
 

    const ownersMapA = await ctx.store.findBy(Owner, {
        id: In([...ownerIds])
    }).then(owners => {
        return new Map(owners.map(owner => [owner.id, owner]))
    })
 
    const accounts = txs.map(tx => {
        const account = new Account({
            id: tx.id,
         
        })
 
        if (tx.from) {
            account.from = ownersMapA.get(tx.from)
            if (account.from == null) {
                account.from = new Owner({id: tx.from, balance: 0n})
                ownersMapA.set(tx.from, account.from)
            }
            account.from.balance -= tx.amount
        }
 
        if (tx.to) {
            account.to = ownersMapA.get(tx.to)
            if (account.to == null) {
                account.to = new Owner({id: tx.to, balance: 0n})
                ownersMapA.set(tx.to, account.to)
            }
            account.to.balance += tx.amount
        }
 
        return account
    })


    await ctx.store.save([...ownersMap.values()])
    await ctx.store.insert(transfers)
  //  await ctx.store.insert(accounts)
})
 
interface TransferRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
    contract?: string
}

function extractTransferRecords(ctx: Ctx): TransferRecord[] {
    const records: TransferRecord[] = []
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = admin.decodeEvent(item.event.args.data)
                console.log('event',event)
                console.log('event.contract is ',event.contract && ss58.codec(SS58_PREFIX).encode(event.contract))
//                if (event.__kind === 'Transfer') {
                    if (event.__kind === 'Granted') {
                        records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                        to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                        amount:BigInt(255000000000),
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        contract: event.contract && ss58.codec(SS58_PREFIX).encode(event.contract)
                    })
                }
            }
        }
    }
    return records
}
 

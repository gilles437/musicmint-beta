import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import * as admin from "./abi/admin"
import {Owner, Transfer} from "./model"
import { BigNumber } from "@ethersproject/bignumber"
 
//const CONTRACT_ADDRESS_SS58 = 'XnrLUQucQvzp5kaaWLG9Q3LbZw5DPwpGn69B5YcywSWVr5w'
const CONTRACT_ADDRESS_SS58 = 'HqKoyxWpojbkw3bhRsFk9RYgQofUFLhKo82Wfu9eai2kWMW'
//const CONTRACT_ADDRESS_SS58 = 'Eu8sD1i48SMvUE7kapR3tkL8QfRpeybvNGMPAw2bM7Ar4n9'


const CONTRACT_ADDRESS = toHex(ss58.decode(CONTRACT_ADDRESS_SS58).bytes)
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix
  
const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: "https://archive-test-3.allfeat.io/graphql"

//        archive: lookupArchive("shibuya", { release: "FireSquid" })
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
            timestamp: tx.timestamp
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
 
    await ctx.store.save([...ownersMap.values()])
    await ctx.store.insert(transfers)
})
 
 
interface TransferRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
}
 
 
function extractTransferRecords(ctx: Ctx): TransferRecord[] {
    const records: TransferRecord[] = []
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = admin.decodeEvent(item.event.args.data)
                console.log('event',event)
//                if (event.__kind === 'Transfer') {
                    if (event.__kind === 'Granted') {
                        records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                        to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                        amount:BigInt(10000000000),
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp)
                    })
                }
            }
        }
    }
    return records
}
 

import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"
import * as adminAbi from "./abi/admin"
import {Owner, Account, Transfer} from "./model"
import { Admin } from "./model/generated"
import { BigNumber } from "@ethersproject/bignumber"

//the address of the deployed admins contract
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
            timestamp: tx.timestamp,

        })
 
        if (tx.from) {
            account.transfersFrom = ownersMapA.get(tx.from)
            if (account.transfersFrom == null) {
                account.transfersFrom = new Owner({id: tx.from, balance: 0n})
                ownersMapA.set(tx.from, account.transfersFrom)
            }
        }
 
        if (tx.to) {
            account.transfersTo = ownersMapA.get(tx.to)
            if (account.transfersTo == null) {
                account.transfersTo = new Owner({id: tx.to, balance: 0n})
                ownersMapA.set(tx.to, account.transfersTo)
            }
        }
 
        return account
    })

    const admins = txs.map(tx => {
        const transfer = new Admin({
            id: tx.id,
            block: tx.block,
            timestamp: tx.timestamp,
            extrinsicHash: "",
            from: tx.from,
            to: tx.to,
            role: tx.role,
            amount: tx.amount,
            contract: tx.contract,
        })
 
        return transfer
    })

    await ctx.store.save([...ownersMap.values()])
    await ctx.store.insert(transfers)
    await ctx.store.insert(accounts)
    await ctx.store.insert(admins)
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

function extractTransferRecords(ctx: Ctx): TransferRecord[] {
    const records: TransferRecord[] = []
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = adminAbi.decodeEvent(item.event.args.data)
                console.log('event',event)
                console.log('event.contract is ',event.contract && ss58.codec(SS58_PREFIX).encode(event.contract))
                if (event.__kind === 'Granted') {
                    records.push({
                    id: item.event.id,
                    from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                    to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                    amount:BigInt(0),
                    role: event.role.__kind,
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
 

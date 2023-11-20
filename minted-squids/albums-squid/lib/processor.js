"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ss58 = __importStar(require("@subsquid/ss58"));
const util_internal_hex_1 = require("@subsquid/util-internal-hex");
const substrate_processor_1 = require("@subsquid/substrate-processor");
const typeorm_store_1 = require("@subsquid/typeorm-store");
const typeorm_1 = require("typeorm");
const albums = __importStar(require("./abi/albums"));
const model_1 = require("./model");
//address of a 0x0 address
const CONTRACT_OxO = '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM';
//the address of the deployed admins contract
//const CONTRACT_ADDRESS_SS58 = '5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG'
const CONTRACT_ADDRESS_SS58 = '5FVLyN1XCPwxEzxmVKRCArwa5yoqGZF4ABqf81HVaz1wPDsh';
const CONTRACT_ADDRESS = (0, util_internal_hex_1.toHex)(ss58.decode(CONTRACT_ADDRESS_SS58).bytes);
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix;
const processor = new substrate_processor_1.SubstrateBatchProcessor()
    .setDataSource({
    archive: "https://archive-test-3.allfeat.io/graphql"
})
    .addContractsContractEmitted(CONTRACT_ADDRESS, {
    data: {
        event: { args: true }
    }
});
processor.run(new typeorm_store_1.TypeormDatabase(), async (ctx) => {
    const txs = extractTransferRecords(ctx);
    const ownerIds = new Set();
    txs.forEach(tx => {
        if (tx.from) {
            ownerIds.add(tx.from);
        }
        if (tx.to) {
            ownerIds.add(tx.to);
        }
    });
    const ownersMap = await ctx.store.findBy(model_1.Owner, {
        id: (0, typeorm_1.In)([...ownerIds])
    }).then(owners => {
        return new Map(owners.map(owner => [owner.id, owner]));
    });
    await ctx.store.save([...ownersMap.values()]);
    let transfers = [];
    txs.map(tx => {
        if (tx.role != "None") {
            const transfer = new model_1.AlbumsAction({
                id: tx.id,
                amount: tx.amount,
                block: tx.block,
                role: tx.role,
                timestamp: tx.timestamp,
                contract: tx.contract,
                from: tx.from,
                to: tx.to
            });
            transfers.push(transfer);
        }
    });
    console.log({ transfers });
    await ctx.store.insert(transfers);
    let removeAdminItems = [];
    let removeSuperAdminItems = [];
    txs.map(tx => {
        if (tx.role == "None") {
            if (tx.contract && tx.contract != CONTRACT_OxO) {
                removeAdminItems.push(tx.contract);
            }
            else if (tx.contract == CONTRACT_OxO && tx.to) {
                removeSuperAdminItems.push(tx.to);
            }
        }
    });
    console.log({ removeAdminItems });
    console.log({ removeSuperAdminItems });
    const uniqueAdminArray = [...new Set(removeAdminItems)];
    console.log({ uniqueAdminArray });
    const uniqueSuperAdminArray = [...new Set(removeSuperAdminItems)];
    console.log({ uniqueSuperAdminArray });
    const transferAdminRemoveItem = await ctx.store.find(model_1.AlbumsAction, {
        where: {
            contract: (0, typeorm_1.In)([...uniqueAdminArray])
        }
    }).then(data => {
        return data;
    });
    console.log({ transferAdminRemoveItem });
    await Promise.all(transferAdminRemoveItem.map(async (item) => {
        await ctx.store.remove(model_1.AlbumsAction, item.id);
    }));
    const transferSuperAdminRemoveItem = await ctx.store.find(model_1.AlbumsAction, {
        where: {
            to: (0, typeorm_1.In)([...removeSuperAdminItems]),
            contract: CONTRACT_OxO
        }
    }).then(data => {
        return data;
    });
    await Promise.all(transferSuperAdminRemoveItem.map(async (item) => {
        await ctx.store.remove(model_1.AlbumsAction, item.id);
    }));
});
function extractTransferRecords(ctx) {
    const records = [];
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            console.log('item block', item.name);
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === CONTRACT_ADDRESS) {
                const event = albums.decodeEvent(item.event.args.data);
                console.log('event', event);
                //     console.log('event.contract is ',event.contract && ss58.codec(SS58_PREFIX).encode(event.contract))
                console.log('event', event.__kind);
                console.log('event', event.albumId, event.songId);
                if (event.__kind === 'ItemCreated') {
                    records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                        //    to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                        amount: BigInt(0),
                        role: "hello",
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        //     contract: event.contract && ss58.codec(SS58_PREFIX).encode(event.contract)
                    });
                }
            }
        }
    }
    return records;
}
//# sourceMappingURL=processor.js.map
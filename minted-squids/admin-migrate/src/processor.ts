import {assertNotNull} from '@subsquid/util-internal'
import * as ss58 from '@subsquid/ss58'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'

// export const SS58_NETWORK = 'astar' // used for the ss58 prefix, astar shares it with shibuya

const CONTRACT_ADDRESS_SS58 = '5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG'
export const CONTRACT_ADDRESS = ss58.decode(CONTRACT_ADDRESS_SS58).bytes
export const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        // Lookup archive by the network name in Subsquid registry
        // See https://docs.subsquid.io/substrate-indexing/supported-networks/
        // archive: lookupArchive('shibuya', {release: 'ArrowSquid'}),
        // Chain RPC endpoint is required on Substrate for metadata and real-time updates
        chain: {
            // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
            // https://docs.subsquid.io/deploy-squid/env-variables/
            url: assertNotNull(process.env.RPC_ENDPOINT),
            // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
            rateLimit: 10
        }
    })
    .addContractsContractEmitted({
        contractAddress: [CONTRACT_ADDRESS],
        extrinsic: true
    })
    .setFields({
        block: {
            timestamp: true
        },
        extrinsic: {
            hash: true
        }
    })
    .setBlockRange({
        // genesis block happens to not have a timestamp, so it's easier
        // to start from 1 in cases when the deployment height is unknown
        from: 1795987
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

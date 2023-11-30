import {assertNotNull} from '@subsquid/util-internal'
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
import * as ss58 from '@subsquid/ss58'
import {toHex} from '@subsquid/util-internal-hex'

import {events} from './types'

//the address of the deployed admins contract
// export const SS58_NETWORK = 'astar'
// export const CONTRACT_ADDRESS = ss58.codec(SS58_NETWORK).decode(CONTRACT_ADDRESS_SS58)

export const CONTRACT_ADDRESS_SS58 = '5HFo61hpJxcg52VV1ENnAbHHsKwhTLaADtYQqe5jRJmsH224'
export const CONTRACT_ADDRESS = ss58.decode(CONTRACT_ADDRESS_SS58).bytes

export const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        // Lookup archive by the network name in Subsquid registry
        // See https://docs.subsquid.io/substrate-indexing/supported-networks/
        //archive: lookupArchive('kusama', {release: 'ArrowSquid'}),
        // archive: 'https://archive-test-3.allfeat.io/graphql',
        // Chain RPC endpoint is required on Substrate for metadata and real-time updates
        chain: {
            // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
            // https://docs.subsquid.io/deploy-squid/env-variables/
            url: assertNotNull(process.env.RPC_ENDPOINT),
            // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
            rateLimit: 10
        }
    })
    // .addEvent({
    //     name: [events.balances.transfer.name],
    //     extrinsic: true
    // })
    .addContractsContractEmitted({
        contractAddress: [CONTRACT_ADDRESS],
        extrinsic: true
    })
    .setFields({
        event: {
            args: true,
            phase: true,
        },
        /*extrinsic: {
            hash: true,
            fee: true
        },*/
        block: {
            timestamp: true
        }
    })
    .setBlockRange({
        // genesis block happens to not have a timestamp, so it's easier
        // to start from 1 in cases when the deployment height is unknown
        from: 2111484
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

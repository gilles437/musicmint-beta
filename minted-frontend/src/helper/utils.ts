import { SignAndSendSuccessResponse } from "@727-ventures/typechain-types";
import { ApiPromise } from "@polkadot/api";
import { WeightV2 } from "@polkadot/types/interfaces";
import { BN, BN_ONE, BN_TEN } from "@polkadot/util";
import { ENV, getCurrentEnv } from "./env";

const WAIT_FINALIZED_SECONDS = 10000;
const MAX_CALL_WEIGHT = new BN(2_000_000_000).isub(BN_ONE).mul(BN_TEN);
const PROOFSIZE = new BN(2_000_000);

export const isTest = (): boolean => process.env.NODE_ENV === "test";

export const waitForTx = async (
  result: SignAndSendSuccessResponse
): Promise<void> => {
  if (isTest() || getCurrentEnv() === ENV.local) return;

  if (result && result.result) {
    while (!result.result.isFinalized) {
      await new Promise((resolve) =>
        setTimeout(resolve, WAIT_FINALIZED_SECONDS)
      );
    }
  }
};

export const defaultOption = (
  api: ApiPromise
):
  | {
      storageDepositLimit: BN;
      gasLimit: WeightV2;
    }
  | undefined => {
  if (isTest()) return undefined;
  return {
    storageDepositLimit: BN_TEN.pow(new BN(18)),
    gasLimit: getGasLimit(api),
  };
};

export const getGasLimit = (
  api: ApiPromise,
  refTime?: BN | number,
  proofSize?: BN | number
): WeightV2 => {
  refTime = refTime || MAX_CALL_WEIGHT;
  proofSize = proofSize || PROOFSIZE;
  return api.registry.createType("WeightV2", {
    refTime: refTime,
    proofSize: proofSize,
  });
};

export const hexToUtf8 = (hexArray: number[]): string =>
  Buffer.from(hexArray.toString().replace("0x", ""), "hex").toString("utf-8");

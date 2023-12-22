import { ApiPromise } from "@polkadot/api";
import { BN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { useMemo } from "react";

export const useGasLimit = (api: ApiPromise | null) => {
  return useMemo(() => {
    if (api) {
      return api.registry.createType("WeightV2", {
        refTime: new BN("10000000000"),
        proofSize: new BN("10000000000"),
      }) as WeightV2;
    }
    return -1;
  }, [api]);
};

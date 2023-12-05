import { ApiPromise } from "@polkadot/api";
import { useMemo } from "react";

export const useChainDecimals = (api: ApiPromise | null) => {
  return useMemo(() => {
    if (api && api.registry.chainDecimals?.length) {
      return api.registry.chainDecimals[0];
    }
    return 10;
  }, [api]);
};

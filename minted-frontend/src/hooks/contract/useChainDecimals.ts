import { useApi } from "@/contexts/Polkadot";
import { useMemo } from "react";

export const useChainDecimals = () => {
  const { api } = useApi();

  return useMemo(() => {
    if (api && api.registry.chainDecimals?.length) {
      return api.registry.chainDecimals[0];
    }
    return 10;
  }, [api]);
};

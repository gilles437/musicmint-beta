import { ContractPromise } from "@polkadot/api-contract";
import { BN, BN_ONE, BN_TEN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";

import { ALLFEAT_CONTRACT } from "@/constants";
import contractAbi from "@/contracts/admin/admin.json"; // Replace by your contract ABI

import { Artist } from "../lib/redux/slices/artistsSlice";
import { useApi } from "./useApi";
import { useCallback } from "react";

export const useAdminContract = () => {
  const api = useApi();

  const getGasLimit = useCallback(() => {
    if (api) {
      return api.registry.createType("WeightV2", {
        refTime: new BN("10000000000"),
        proofSize: new BN("10000000000"),
      }) as WeightV2;
    }
    return -1;
  }, [api]);

  const getArtists = useCallback(
    async (caller: string): Promise<Artist[] | null> => {
      if (!api) {
        return null;
      }

      // Create Contract
      const contract = new ContractPromise(api, contractAbi, ALLFEAT_CONTRACT);
      if (!contract) {
        return null;
      }

      const gasLimit = getGasLimit();
      const options = { value: 0, storageDepositLimit: null, gasLimit };
      const { result, output } = await contract.query.getAllAdmins(
        caller,
        options
      );
      if (!result.isOk || !output) {
        console.error("Error", result.asErr);
        return null;
      }

      const { Ok: admins }: { Ok: string[] } = output.toHuman() as any;
      if (!admins?.length) {
        return null;
      }

      const artists = await Promise.all(
        admins.map((admin) => {
          return contract.query
            .getArtistContract(
              caller,
              {
                value: 0,
                gasLimit,
                storageDepositLimit: null,
              },
              admin
            )
            .then(({ result, output }) => {
              if (result.isOk && output) {
                const { Ok: contract } = output.toHuman() as any;
                return {
                  to: admin,
                  contract,
                  timestamp: "",
                } as Artist;
              }
              return {} as Artist;
            });
        })
      );

      return artists.filter((i) => i.contract);
    },
    [api, getGasLimit]
  );

  return {
    getArtists,
  };
};

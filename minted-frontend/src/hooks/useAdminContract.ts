import { CodePromise, ContractPromise } from "@polkadot/api-contract";
import { CodeSubmittableResult } from "@polkadot/api-contract/base";
import { useCallback, useMemo } from "react";

import { ALLFEAT_CONTRACT } from "@/constants";
import contractAbi from "@/contracts/admin/admin.json"; // Replace by your contract ABI
import { ContractFile as ArtistContract } from "@/contracts/album/albums1";
import { useWallets } from "@/contexts/Wallets";
import { getActiveAccount } from "@/utils/account";

import { Artist } from "../lib/redux/slices/adminSlice";
import { useApi } from "./useApi";
import { useGasLimit } from "./useGasLimit";

export const useAdminContract = () => {
  const api = useApi();
  const gasLimit = useGasLimit(api);
  const { wallet } = useWallets();

  const contract = useMemo(() => {
    if (api) {
      return new ContractPromise(api, contractAbi, ALLFEAT_CONTRACT);
    }
    return null;
  }, [api]);

  const request = useMemo(() => {
    if (!api || !contract) {
      console.error("Api is not ready");
      return null;
    }
    if (!wallet) {
      console.error("Please connect your wallet!");
      return null;
    }

    const account = getActiveAccount();
    if (!account) {
      console.error("Invalid account!");
      return null;
    }

    return {
      api,
      contract,
      wallet,
      account,
      options: { value: 0, storageDepositLimit: null, gasLimit },
    };
  }, [api, contract, wallet, gasLimit]);

  const addSuperAdmin = useCallback(
    async (adminAddress: string) => {
      if (!request) {
        return false;
      }

      const { contract, wallet, options, account } = request;
      const tx = await contract.tx.addSuperAdmin(options, adminAddress);

      await tx.signAndSend(account, { signer: wallet.signer });
      return true;
    },
    [request]
  );

  const removeSuperAdmin = useCallback(
    async (adminAddress: string) => {
      if (!request) {
        return false;
      }

      const { contract, wallet, options, account } = request;
      const tx = await contract.tx.removeSuperAdmin(options, adminAddress);

      await tx.signAndSend(account, { signer: wallet.signer });
      return true;
    },
    [request]
  );

  const getArtists = useCallback(
    async (caller: string): Promise<Artist[] | null> => {
      if (!request) {
        return null;
      }

      const { contract, options } = request;
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
    [request]
  );

  const addArtist = useCallback(
    async (address: string, contractAddress: string) => {
      if (!request) {
        return null;
      }

      const { contract, wallet, options, account } = request;
      const tx = await contract.tx.addAdmin(options, address, contractAddress);

      await tx.signAndSend(account, { signer: wallet.signer });
      return true;
    },
    [request]
  );

  const removeArtist = useCallback(
    async (address: string, contractAddress: string) => {
      if (!request) {
        return null;
      }

      const { contract, wallet, options, account } = request;
      const tx = await contract.tx.removeAdmin(
        options,
        address,
        contractAddress
      );

      await tx.signAndSend(account, { signer: wallet.signer });
      return true;
    },
    [request]
  );

  const deployArtistContract = useCallback(
    async (
      artistAddress: string,
      callback: (contractAddress: string) => void
    ) => {
      if (!request) {
        return false;
      }

      const { api, wallet, account } = request;
      const code = new CodePromise(
        api,
        ArtistContract,
        ArtistContract.source.wasm
      );

      const tx = code.tx.new(
        { value: 0, gasLimit, storageDepositLimit: null },
        "",
        artistAddress
      );
      const unsub = await tx.signAndSend(
        account,
        { signer: wallet.signer },
        (result) => {
          if (result.status.isFinalized) {
            const dataResult: CodeSubmittableResult<"promise"> = result;
            if (dataResult.contract) {
              const address = dataResult.contract.address.toString();
              callback(address);
            }
            unsub();
          }
        }
      );

      return true;
    },
    [request]
  );

  return {
    addSuperAdmin,
    removeSuperAdmin,
    getArtists,
    addArtist,
    removeArtist,
    deployArtistContract,
  };
};

import { ContractPromise } from "@polkadot/api-contract";
import { BN, BN_ONE, BN_TEN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ALLFEAT_CONTRACT } from "@/constants";
import contractAbi from "@/contracts/album/albums.json";
import { useWallets } from "@/contexts/Wallets";
import { getActiveAccount } from "@/utils/account";

import { Album } from "../lib/redux/slices/albumSlice";
import { useApi } from "./useApi";
import { useGasLimit } from "./useGasLimit";
import { useChainDecimals } from "./useChainDecimals";

interface ContractEventsType {
  dispatchInfo: {};
  events: [];
  status: {};
  txHash: string;
  txIndex: number;
  blockNumber: string;
  contractEvents: [
    {
      args: string[];
      docs: [];
      identifier: string;
      index: number;
    }
  ];
}

export const useAlbumContract = (contractAddress: string) => {
  const api = useApi();
  const gasLimit = useGasLimit(api);
  const chainDecimals = useChainDecimals(api);
  const { wallet } = useWallets();

  const contract = useMemo(() => {
    if (api) {
      return new ContractPromise(api, contractAbi, contractAddress);
    }
    return null;
  }, [api, contractAddress]);

  const createAlbum = useCallback(
    async (
      tokenMetaId: string,
      maxSupply: number,
      currentPrice: number,
      callback: (albumId: string) => void,
    ): Promise<boolean> => {
      if (!api || !contract) {
        console.error("Api is not ready");
        return false;
      }
      console.log("****wallet", wallet);
      if (!wallet) {
        console.error("Please connect your wallet!");
        return false;
      }

      const account = getActiveAccount();
      console.log("****account", account);

      const options = { value: 0, storageDepositLimit: null, gasLimit };
      const price = Number(currentPrice) * 10 ** chainDecimals;
      const albumUri = `https://ipfs.io/ipfs/${tokenMetaId}`;

      const queryTx = await contract.query.createAlbum(
        account,
        options,
        maxSupply,
        price,
        albumUri
      );

      console.log("*****queryTx=", queryTx);
      if (!queryTx.result?.isOk) {
        return false;
      }

      const tx = await contract.tx.createAlbum(
        options,
        maxSupply, //max_supply
        price,
        albumUri
      );
      console.log("*****tx=", tx);

      const parseAlbumId = (result: any) => {
        const event: ContractEventsType = JSON.parse(
          JSON.stringify(result, null, 2)
        );
        if (event.contractEvents?.length && event.contractEvents[0].args[1]) {
          return event.contractEvents[0].args[1];
        }
        return '';
      };

      const unsub = await tx.signAndSend(
        account,
        { signer: wallet.signer },
        (result) => {
          console.log("*****tx**result=", result.status.isFinalized);
          if (result.status.isFinalized) {
            const albumId = parseAlbumId(result);
            console.log("*****tx**result**albumId=", albumId);
            callback(albumId);
            unsub();
          }
        }
      );
      return true;
    },
    [api, contract, gasLimit, wallet]
  );

  return {
    createAlbum,
  };
};

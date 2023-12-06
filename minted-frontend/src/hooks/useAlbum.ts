import { ContractPromise } from '@polkadot/api-contract';
import { useCallback, useMemo } from 'react';

import contractAbi from '@/contracts/album/albums.json';
import { useWallets } from '@/contexts/Wallets';
import { getActiveAccount } from '@/utils/account';

import { useApi } from './useApi';
import { useGasLimit } from './useGasLimit';
import { useChainDecimals } from './useChainDecimals';

export interface ContractEventsType {
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

export const useAlbum = (contractAddress?: string) => {
  const api = useApi();
  const gasLimit = useGasLimit(api);
  const chainDecimals = useChainDecimals(api);
  const { wallet } = useWallets();

  const contract = useMemo(() => {
    if (api && contractAddress) {
      return new ContractPromise(api, contractAbi, contractAddress);
    }
    return null;
  }, [api, contractAddress]);

  const request = useMemo(() => {
    if (!api || !contract) {
      console.error('Api is not ready');
      return null;
    }
    if (!wallet) {
      console.error('Please connect your wallet!');
      return null;
    }

    const account = getActiveAccount();
    if (!account) {
      console.error('Invalid account!');
      return null;
    }

    return {
      api,
      contract,
      wallet,
      account,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, contract, wallet, gasLimit]);

  const createAlbum = useCallback(
    async (
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string,
      callback: (albumId: number) => void
    ): Promise<boolean> => {
      if (!request) {
        console.error('Api is not ready');
        return false;
      }

      const { contract, signer, options, account } = request;
      const priceInWei = Number(tokenPrice) * 10 ** chainDecimals;

      const queryTx = await contract.query.createAlbum(
        account,
        options,
        maxSupply,
        priceInWei,
        metaUrl
      );

      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.createAlbum(
        options,
        maxSupply,
        priceInWei,
        metaUrl
      );
      console.log('*****tx=', tx);

      const onSuccess = (result: any) => {
        const event: ContractEventsType = JSON.parse(
          JSON.stringify(result, null, 2)
        );
        console.log('*****create.album.event', event);
        const { contractEvents } = event;
        if (contractEvents?.length && contractEvents[0].args?.length > 1) {
          const albumId = contractEvents[0].args[1];
          callback(Number(albumId));
        }
        callback(-1);
      };

      const unsub = await tx.signAndSend(account, signer, (result) => {
        if (result.status.isFinalized) {
          onSuccess(result);
          unsub();
        }
      });
      return true;
    },
    [request, chainDecimals]
  );

  const deleteAlbum = useCallback(
    async (
      albumId: number,
      callback: (albumId: number) => void
    ): Promise<boolean> => {
      if (!request) {
        console.error('Api is not ready');
        return false;
      }

      const { contract, signer, options, account } = request;
      const queryTx = await contract.query.deleteAlbum(
        account,
        options,
        albumId
      );

      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.createAlbum(options, albumId);
      console.log('*****tx=', tx);

      const unsub = await tx.signAndSend(account, signer, (result) => {
        if (result.status.isFinalized) {
          callback(albumId);
          unsub();
        }
      });
      return true;
    },
    [request]
  );

  const mintAlbum = useCallback(
    async (
      albumId: number,
      contractAddress: string,
      callback: (albumId: number) => void
    ): Promise<boolean> => {
      if (!request) {
        console.error('Api is not ready');
        return false;
      }

      const { api, signer, options, account } = request;

      const contract = new ContractPromise(api, contractAbi, contractAddress);
      const queryTx = await contract.query.mintAlbum(account, options, albumId);

      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.mintAlbum(options, albumId);
      console.log('*****tx=', tx);

      const unsub = await tx.signAndSend(account, signer, (result) => {
        console.log('*****tx**result=', result.status.isFinalized);
        if (result.status.isFinalized) {
          callback(albumId);
          unsub();
        }
      });
      return true;
    },
    [request]
  );

  return {
    createAlbum,
    deleteAlbum,
    mintAlbum,
  };
};

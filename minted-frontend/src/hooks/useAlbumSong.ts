import { ContractPromise } from '@polkadot/api-contract';
import { useCallback, useMemo } from 'react';

import contractAbi from '@/contracts/album/albums.json';
import { useWallets } from '@/contexts/Wallets';
import { getActiveAccount } from '@/utils/account';

import { useApi } from './useApi';
import { useGasLimit } from './useGasLimit';
import { useChainDecimals } from './useChainDecimals';
import { ContractEventsType } from './useAlbum';

export const useAlbumSong = (contractAddress?: string) => {
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
    if (!api) {
      console.error('API is not ready');
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
      wallet,
      account,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, wallet, gasLimit]);

  const createSong = useCallback(
    async (
      albumId: number,
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string,
      callback: (albumId: number) => void
    ): Promise<boolean> => {
      if (!request || !contract) {
        return false;
      }
      
      try {
        const { signer, options, account } = request;
        const priceInWei = Number(tokenPrice) * 10 ** chainDecimals;

        const queryTx = await contract.query.createSong(
          account,
          options,
          albumId,
          maxSupply,
          priceInWei,
          metaUrl
        );

        console.log('*****queryTx=', queryTx);
        if (!queryTx.result?.isOk) {
          console.error('****queryTx.error', queryTx.result.asErr);
          return false;
        }

        const tx = await contract.tx.createSong(
          options,
          albumId,
          maxSupply,
          priceInWei,
          metaUrl
        );
        console.log('*****tx=', tx);

        const onSuccess = (result: any) => {
          const event: ContractEventsType = JSON.parse(
            JSON.stringify(result, null, 2)
          );
          console.log('*****create.song.event', event);
          const { contractEvents } = event;
          if (contractEvents?.length && contractEvents[0].args?.length > 2) {
            const songId = contractEvents[0].args[2];
            callback(Number(songId));
          } else {
            callback(-1);
          }
        };

        const unsub = await tx.signAndSend(account, signer, (result) => {
          if (result.status.isFinalized) {
            onSuccess(result);
            unsub();
          }
        });
        return true;
      } catch (err) {
        console.error(typeof(err), err);
        return false;
      }
    },
    [request, contract, chainDecimals]
  );

  const deleteSong = useCallback(
    async (
      albumId: number,
      songId: string,
      callback: (albumId: number) => void
    ): Promise<boolean> => {
      if (!request || !contract) {
        return false;
      }
      
      try {
        const { signer, options, account } = request;
        const queryTx = await contract.query.deleteSong(
          account,
          options,
          albumId,
          songId
        );

        if (!queryTx.result?.isOk) {
          console.error('****queryTx.error', queryTx.result.asErr);
          return false;
        }

        const tx = await contract.tx.deleteSong(options, albumId, songId);
        console.log('*****tx=', tx);

        const unsub = await tx.signAndSend(account, signer, (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (result.status.isFinalized) {
            callback(albumId);
            unsub();
          }
        });
        return true;
      } catch (err) {
        console.error(typeof(err), err);
        return false;
      }
    },
    [request, contract]
  );

  const mintSong = useCallback(
    async (
      albumId: number,
      songId: string,
      contractAddress: string,
      callback: (success: boolean) => void
    ): Promise<boolean> => {
      if (!request) {
        return false;
      }

      try {
        const { api, signer, options, account } = request;

        const contract = new ContractPromise(api, contractAbi, contractAddress);
        const queryTx = await contract.query.mintSong(
          account,
          options,
          albumId,
          songId
        );

        if (!queryTx.result?.isOk) {
          console.error('****queryTx.error', queryTx.result.asErr);
          return false;
        }

        const tx = await contract.tx.mintAlbum(options, albumId);
        console.log('*****tx=', tx);

        const unsub = await tx.signAndSend(account, signer, (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (result.status.isFinalized) {
            callback(true);
            unsub();
          }
        });
        return true;
      } catch (err) {
        console.error(typeof(err), err);
        return false;
      }
    },
    [request]
  );

  return {
    createSong,
    deleteSong,
    mintSong,
  };
};

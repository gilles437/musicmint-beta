import { ContractPromise } from '@polkadot/api-contract';
import { BN } from "@polkadot/util";
import { useCallback, useMemo } from 'react';

import contractAbi from '@/contracts/album/albums.json';
import { useWallets } from '@/contexts/Wallets';
import { useApi } from '@/contexts/Polkadot';

import { useGasLimit } from './useGasLimit';
import { useChainDecimals } from './useChainDecimals';
import { ContractEventsType } from './useAlbum';

export const useAlbumSong = (contractAddress?: string) => {
  const { api } = useApi();
  const gasLimit = useGasLimit(api);
  const chainDecimals = useChainDecimals(api);
  const { wallet, walletAddress } = useWallets();

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
    if (!wallet || !walletAddress) {
      console.error('Please connect your wallet!');
      return null;
    }

    return {
      api,
      wallet,
      account: walletAddress,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, wallet, walletAddress, gasLimit]);

  const createSong = useCallback(
    async (
      albumId: number,
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string
    ): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = request;
          const priceInWei = Math.floor(Number(tokenPrice) * (10 ** chainDecimals));

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
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.createSong(options, albumId, maxSupply, priceInWei, metaUrl);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            if (!result.status.isFinalized) {
              return;
            }

            const event: ContractEventsType = JSON.parse(JSON.stringify(result, null, 2));
            console.log('*****create.song.event', event);

            let songId = -1;
            const { contractEvents } = event;
            if (contractEvents?.length && contractEvents[0].args?.length > 2) {
              songId = Number(contractEvents[0].args[2]);
            }

            unsub();
            resolve(songId);
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request, contract, chainDecimals]
  );

  const deleteSong = useCallback(
    async (albumId: number, songId: number): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = request;
          const queryTx = await contract.query.deleteSong(account, options, albumId, songId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.deleteSong(options, albumId, songId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(songId);
            }
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request, contract]
  );

  const mintSong = useCallback(
    async (
      contractAddress: string,
      albumId: number,
      songId: number,
      price: string
    ): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request) {
            return reject('API is not ready');
          }

          const { api, signer, options, account } = request;
          const mintOptions = { ...options, value: price };
          console.log('mintOptions', mintOptions);

          const res = await api.query.system.account(account);
          const { data: { free: balance } } = res.toJSON() as any;

          if (new BN(balance).sub(new BN(price)).isNeg()) {
            return reject(`You don't have enough balance in your wallet!`);
          }

          const contract_ = new ContractPromise(api, contractAbi, contractAddress);
          const queryTx = await contract_.query.mintSong(account, mintOptions, albumId, songId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract_.tx.mintSong(mintOptions, albumId, songId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            // console.log('*****tx**result=', result.toHuman());
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(songId);
            }
          });
          return true;
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request]
  );

  return {
    createSong,
    deleteSong,
    mintSong,
  };
};

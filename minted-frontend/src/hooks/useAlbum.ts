import { ContractPromise } from '@polkadot/api-contract';
import { BN } from "@polkadot/util";
import { useCallback, useMemo } from 'react';

import contractAbi from '@/contracts/album/albums.json';
import { useApi } from '@/contexts/Polkadot';
import { useWallets } from '@/contexts/Wallets';

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

    console.info('API Ready!!!');
    return {
      api,
      wallet,
      account: walletAddress,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, wallet, walletAddress, gasLimit]);

  const createAlbum = useCallback(
    async (maxSupply: number, tokenPrice: number, metaUrl: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = request;
          const priceInWei = Math.floor(Number(tokenPrice) * (10 ** chainDecimals));

          const queryTx = await contract.query.createAlbum(
            account,
            options,
            maxSupply,
            priceInWei,
            metaUrl
          );

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.createAlbum(options, maxSupply, priceInWei, metaUrl);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            console.log('*****tx**result=', result.status.isFinalized);
            if (!result.status.isFinalized) {
              return;
            }

            const event: ContractEventsType = JSON.parse(JSON.stringify(result, null, 2));
            console.log('*****create.album.event', event);

            let albumId = -1;
            const { contractEvents } = event;
            if (contractEvents?.length && contractEvents[0].args?.length > 1) {
              albumId = Number(contractEvents[0].args[1]);
            }

            unsub();
            resolve(albumId);
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request, contract, chainDecimals]
  );

  const setTokenUri = useCallback(
    async (albumId: number, metaUrl: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = request;

          const queryTx = await contract.query.setTokenUri(
            account,
            options,
            albumId,
            metaUrl
          );

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.setTokenUri(options, albumId, metaUrl);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            console.log('*****tx**result=', result.status.isFinalized);
            if (!result.status.isFinalized) {
              return;
            }

            unsub();
            resolve(albumId);
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request, contract]
  );

  const deleteAlbum = useCallback(
    async (albumId: number, contractAddress: string): Promise<number | null> => {
      return new Promise<number>(async (resolve, reject) => {
        try {
          if (!request) {
            return reject('API not ready');
          }

          const { api, signer, options, account } = request;

          const contract_ = new ContractPromise(api, contractAbi, contractAddress);
          console.log('contract_', contract_);
          const queryTx = await contract_.query.deleteAlbum(account, options, albumId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          console.log('deleteAlbum, albumId=', albumId)
          const tx = await contract_.tx.deleteAlbum(options, albumId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            // console.log('*****tx**result=', result.toHuman());
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(albumId);
            }
          });
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    },
    [request]
  );

  const mintAlbum = useCallback(
    async (albumId: number, price: string, contractAddress: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request) {
            return reject('API is not ready');
          }

          const { api, signer, options, account } = request;
          const mintOptions = { ...options, value: price };
          console.log('mintOptions', mintOptions)

          const res = await api.query.system.account(account);
          const { data: { free: balance } } = res.toJSON() as any;

          if (new BN(balance).sub(new BN(price)).isNeg()) {
            return reject(`You don't have enough balance in your wallet!`);
          }

          const contract_ = new ContractPromise(api, contractAbi, contractAddress);
          const queryTx = await contract_.query.mintAlbum(account, mintOptions, albumId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract_.tx.mintAlbum(mintOptions, albumId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            // console.log('*****tx**result=', result.toHuman());
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(albumId);
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
    createAlbum,
    setTokenUri,
    deleteAlbum,
    mintAlbum,
  };
};

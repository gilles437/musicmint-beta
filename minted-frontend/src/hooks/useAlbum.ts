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

    console.info('API Ready!!!');
    return {
      api,
      wallet,
      account,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, contract, wallet, gasLimit]);

  const createAlbum = useCallback(
    async (maxSupply: number, tokenPrice: number, metaUrl: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!request || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = request;
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
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.createAlbum(options, maxSupply, priceInWei, metaUrl);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
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
          reject(err);
        }
      });
    },
    [request, contract, chainDecimals]
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

          const tx = await contract_.tx.deleteAlbum(options, albumId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            if (result.status.isFinalized) {
              unsub();
              resolve(albumId);
            }
          });
        } catch (err) {
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

          const contract_ = new ContractPromise(api, contractAbi, contractAddress);
          const queryTx = await contract_.query.mintAlbum(account, mintOptions, albumId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract_.tx.mintAlbum(mintOptions, albumId);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            console.log('*****tx**result=', result.toHuman());
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(albumId);
            }
          });
          return true;
        } catch (err) {
          reject(err);
        }
      });
    },
    [request]
  );

  return {
    createAlbum,
    deleteAlbum,
    mintAlbum,
  };
};

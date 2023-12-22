import { BN } from '@polkadot/util';
import { useCallback } from 'react';

import { useAlbumContract } from './useAlbumContract';
import { createAlbumContract } from './utils';

export const useMintAlbum = () => {
  const { params } = useAlbumContract();

  return useCallback(
    async (contractAddress: string, albumId: number, price: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API is not ready');
          }

          const { api, signer, options, account } = params;
          const mintOptions = { ...options, value: price };
          console.log('mintOptions', mintOptions);

          const res = await api.query.system.account(account);
          const {
            data: { free: balance },
          } = res.toJSON() as any;

          if (new BN(balance).sub(new BN(price)).isNeg()) {
            return reject(`You don't have enough balance in your wallet!`);
          }

          const contract = createAlbumContract(api, contractAddress);
          if (!contract) {
            return reject('Iniitialize Error!');
          }
          console.log('contract', contract);

          const queryTx = await contract.query.mintAlbum(account, mintOptions, albumId);
          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.mintAlbum(mintOptions, albumId);
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
    [params]
  );
};

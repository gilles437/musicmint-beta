import { BN } from '@polkadot/util';
import { useCallback } from 'react';

import { useInitialize } from './useInitialize';
import { createAlbumContract } from './utils';

export const useMintSong = () => {
  const { params } = useInitialize();

  return useCallback(
    async (
      contractAddress: string,
      albumId: number,
      songId: number,
      price: string
    ): Promise<number | null> => {
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

          const queryTx = await contract.query.mintSong(account, mintOptions, albumId, songId);
          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.mintSong(mintOptions, albumId, songId);
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
    [params]
  );
};

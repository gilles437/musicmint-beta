import { useCallback } from 'react';

import { useInitialize } from './useInitialize';
import { createAlbumContract } from './utils';

export const useDeleteAlbum = () => {
  const { params } = useInitialize();

  return useCallback(
    async (contractAddress: string, albumId: number): Promise<number | null> => {
      return new Promise<number>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API not ready');
          }

          const { api, signer, options, account } = params;

          const contract = createAlbumContract(api, contractAddress);
          if (!contract) {
            return reject('Iniitialize Error!');
          }
          console.log('contract', contract);

          const queryTx = await contract.query.deleteAlbum(account, options, albumId);
          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          console.log('deleteAlbum, albumId=', albumId);
          const tx = await contract.tx.deleteAlbum(options, albumId);
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
    [params]
  );
};

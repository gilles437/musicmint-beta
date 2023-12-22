import { useCallback } from 'react';

import { useInitialize } from './useInitialize';
import { createAlbumContract } from './utils';

export const useSetTokenUri = () => {
  const { params } = useInitialize();

  return useCallback(
    async (contractAddress: string, albumId: number, metaUrl: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API is not ready');
          }

          const { api, signer, options, account } = params;

          const contract = createAlbumContract(api, contractAddress);
          if (!contract) {
            return reject('Iniitialize Error!');
          }
          console.log('contract', contract);

          const queryTx = await contract.query.setTokenUri(account, options, albumId, metaUrl);
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
    [params]
  );
};

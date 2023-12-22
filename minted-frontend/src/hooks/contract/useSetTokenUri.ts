import { useCallback } from 'react';
import { useAlbumContract } from './useAlbumContract';

export const useSetTokenUri = (contractAddress?: string | null) => {
  const { contract, params } = useAlbumContract(contractAddress);

  return useCallback(
    async (albumId: number, metaUrl: string): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!params || !contract) {
            return reject('API is not ready');
          }

          const { signer, options, account } = params;

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
    [contract, params]
  );
};

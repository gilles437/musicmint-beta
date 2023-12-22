import { ContractPromise } from '@polkadot/api-contract';
import { useCallback } from 'react';
import contractAbi from '@/contracts/album/albums.json';
import { useContract } from './useContract';

export const useDeleteAlbum = () => {
  const { params } = useContract();

  return useCallback(
    async (albumId: number, contractAddress: string): Promise<number | null> => {
      return new Promise<number>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API not ready');
          }

          const { api, signer, options, account } = params;

          const contract_ = new ContractPromise(api, contractAbi, contractAddress);
          console.log('contract_', contract_);
          const queryTx = await contract_.query.deleteAlbum(account, options, albumId);

          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          console.log('deleteAlbum, albumId=', albumId);
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
    [params]
  );
};

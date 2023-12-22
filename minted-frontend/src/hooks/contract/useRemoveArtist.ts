import { useCallback } from 'react';

import { useInitialize } from './useInitialize';
import { createAdminContract } from './utils';

export const useRemoveArtist = () => {
  const { params } = useInitialize();

  return useCallback(
    async (address: string, contractAddress: string): Promise<boolean> => {
      return new Promise<boolean>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API not ready');
          }

          const { api, signer, options, account } = params;

          const contract = createAdminContract(api);
          if (!contract) {
            return reject('Iniitialize Error!');
          }
          console.log('contract', contract);

          const queryTx = await contract.query.removeAdmin(
            account,
            options,
            address,
            contractAddress
          );
          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.removeAdmin(options, address, contractAddress);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            console.log('*****tx**result=', result.status.isFinalized);
            if (result.status.isFinalized) {
              unsub();
              resolve(true);
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

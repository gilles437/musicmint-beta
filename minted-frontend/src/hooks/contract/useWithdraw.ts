import { useCallback } from 'react';
import { useAlbumContract } from './useAlbumContract';
import { ContractEventsType } from './types';

export const useAlbum = (contractAddress?: string | null) => {
  const { contract, params } = useAlbumContract(contractAddress);

  return useCallback(async (): Promise<string | null> => {
    return new Promise<string | null>(async (resolve, reject) => {
      try {
        if (!params || !contract) {
          return reject('API is not ready');
        }

        const { signer, options, account } = params;
        console.log('contract.query', contract.query);

        const queryTx = await contract.query['aft37PayableMint::withdraw'](account, options);

        if (!queryTx.result?.isOk) {
          console.error('****queryTx.error', queryTx.result.asErr);
          return reject(queryTx.result.asErr);
        }

        const tx = await contract.tx['aft37PayableMint::withdraw'](options);
        console.log('*****tx=', tx);

        const unsub = await tx.signAndSend(account, signer, (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (!result.status.isFinalized) {
            return;
          }

          const event: ContractEventsType = JSON.parse(JSON.stringify(result, null, 2));
          console.log('*****withdraw.event', event);

          let amount = '0';
          const { events } = event;
          if (events?.length && events.length > 1 && events[1].event?.data?.length == 3) {
            amount = events[1].event.data[2];
          }

          unsub();
          resolve(amount);
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }, [params, contract]);
};

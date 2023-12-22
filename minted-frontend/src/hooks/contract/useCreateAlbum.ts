import { useCallback } from 'react';
import { ContractEventsType } from './types';
import { useChainDecimals } from './useChainDecimals';
import { useInitialize } from './useInitialize';
import { createAlbumContract } from './utils';

export const useCreateAlbum = () => {
  const chainDecimals = useChainDecimals();
  const { params } = useInitialize();

  return useCallback(
    async (
      contractAddress: string,
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string
    ): Promise<number | null> => {
      return new Promise<number | null>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API is not ready');
          }

          const { api, signer, options, account } = params;
          const priceInWei = Math.floor(Number(tokenPrice) * 10 ** chainDecimals);

          const contract = createAlbumContract(api, contractAddress);
          if (!contract) {
            return reject('Iniitialize Error!');
          }
          console.log('contract', contract);

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
    [params, chainDecimals]
  );
};

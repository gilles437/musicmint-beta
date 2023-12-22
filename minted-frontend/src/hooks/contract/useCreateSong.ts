import { useCallback } from 'react';

import { ContractEventsType } from './types';
import { useChainDecimals } from './useChainDecimals';
import { useAlbumContract } from './useAlbumContract';
import { createAlbumContract } from './utils';

export const useCreateSong = () => {
  const chainDecimals = useChainDecimals();
  const { params } = useAlbumContract();

  return useCallback(
    async (
      contractAddress: string,
      albumId: number,
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

          const queryTx = await contract.query.createSong(
            account,
            options,
            albumId,
            maxSupply,
            priceInWei,
            metaUrl
          );
          console.log('*****queryTx=', queryTx);
          if (!queryTx.result?.isOk) {
            console.error('****queryTx.error', queryTx.result.asErr);
            return reject(queryTx.result.asErr);
          }

          const tx = await contract.tx.createSong(options, albumId, maxSupply, priceInWei, metaUrl);
          console.log('*****tx=', tx);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            if (!result.status.isFinalized) {
              return;
            }

            const event: ContractEventsType = JSON.parse(JSON.stringify(result, null, 2));
            console.log('*****create.song.event', event);

            let songId = -1;
            const { contractEvents } = event;
            if (contractEvents?.length && contractEvents[0].args?.length > 2) {
              songId = Number(contractEvents[0].args[2]);
            }

            unsub();
            resolve(songId);
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

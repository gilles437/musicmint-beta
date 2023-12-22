import { CodePromise } from '@polkadot/api-contract';
import { useCallback } from 'react';

import ArtistContract from '@/contracts/album/albums_wasm.json';
import { useInitialize } from './useInitialize';
import { CodeSubmittableResult } from '@polkadot/api-contract/base';

export const useDeployArtistContract = () => {
  const { params } = useInitialize();

  return useCallback(
    async (artistAddress: string): Promise<string> => {
      return new Promise<string>(async (resolve, reject) => {
        try {
          if (!params) {
            return reject('API not ready');
          }

          const { api, signer, options, account } = params;
          const code = new CodePromise(api, ArtistContract, ArtistContract.source.wasm);

          const tx = code.tx.new(options, '', artistAddress);

          const unsub = await tx.signAndSend(account, signer, (result) => {
            if (result.status.isFinalized) {
              const dataResult: CodeSubmittableResult<'promise'> = result;
              if (dataResult.contract) {
                const address = dataResult.contract.address.toString();
                resolve(address);
              }
              unsub();
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

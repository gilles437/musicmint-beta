import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import contractAbi from '@/contracts/album/albums.json';

export const createAlbumContract = (api: ApiPromise, address: string) => {
  return new ContractPromise(api, contractAbi, address);
};

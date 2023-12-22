import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';

import { ALLFEAT_CONTRACT } from "@/constants";
import adminAbi from '@/contracts/admin/admin.json';
import albumAbi from '@/contracts/album/albums.json';

export const createAdminContract = (api: ApiPromise) => {
  return new ContractPromise(api, adminAbi, ALLFEAT_CONTRACT);
};

export const createAlbumContract = (api: ApiPromise, address: string) => {
  return new ContractPromise(api, albumAbi, address);
};

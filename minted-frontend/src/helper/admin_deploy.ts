import { SignAndSendSuccessResponse } from '@727-ventures/typechain-types'
import type { ApiPromise } from "@polkadot/api";
import type { KeyringPair } from "@polkadot/keyring/types";
import { LastArrayElement } from "type-fest";

import Admin_factory from "@/contract/admin/types/constructors/admin";
import Admin from "@/contract/admin/types/contracts/admin";

import { ExcludeLastArrayElement } from "./utilityTypes";
import { defaultOption, isTest, waitForTx } from './utils'


type FactoryArgs<C extends (...args: unknown[]) => unknown> = {
  api: ApiPromise;
  signer: KeyringPair;
} & {
  args: ExcludeLastArrayElement<Parameters<C>>;
  option?: LastArrayElement<Parameters<C>>;
};

const afterDeployment = async (
  name: string,
  contract: {
    result: SignAndSendSuccessResponse;
    address: string;
  }
) => {
  if (!isTest()) console.log(name + " was deployed at: " + contract.address);
  await waitForTx(contract.result);
};

export const deployAdmin = async ({
  api,
  signer,
  args,
  option = defaultOption(api),
}: FactoryArgs<Admin_factory['new']>): Promise<Admin> => {
  const factory = new Admin_factory(api, signer)
  const contract = await factory.new(...args, option)
  const result = new Admin(contract.address, signer, api)
  await afterDeployment(result.name, contract)
  return result
}
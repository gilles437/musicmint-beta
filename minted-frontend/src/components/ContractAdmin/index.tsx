import { useState, useEffect } from "react";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import contractAbi from "./admin.json"; // Replace by your contract ABI
import { BN } from "@polkadot/util";
import { KeyringPair } from "@polkadot/keyring/types";
import { WeightV2 } from "@polkadot/types/interfaces";
import AdminContract from "@contract/types/contracts/admin";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { AddressOrPair, SubmittableExtrinsic } from "@polkadot/api/types";

interface FetchResult {
  ok: string[];
}

const ContractAdmin = () => {
  const [isVerified, setArtistVerifiedState] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [adminList, setAdminList] = useState<string[]>([]);
  const [superAdminList, setSuperAdminList] = useState<[]>([]);

  const contractAddress = "5CDR39HB2UiBwozs584p4AhmCkAueFsVSxHBMpUpZypJoo5g"; // Replace the address of your contract
  const caller = "5HfvsrJHuNH2t97RgHMqh8WhMTrm32DDYjcWkD9HLsZtyf1J";      //The address of Contract Owner
  const accountId = "5GYgwUxoyRiuU3kHMRdUub7q4bNSjG1bipVfzqqxutWoQxzc"; // Replace by your function argument

  useEffect(() => {
    async function fetchIsVerifiedArtist() {
      setIsLoading(true);
      web3Enable("subwallet-js");
      // 1. Connection to the chain
      const wsProvider = new WsProvider("wss://rpc-test.allfeat.io");
      const api = await ApiPromise.create({ provider: wsProvider });
      const { chainSS58, chainDecimals, chainTokens } = api.registry;
      const { genesisHash } = api;
      console.log({ chainSS58, chainDecimals, chainTokens, genesisHash });
      localStorage.setItem("chainSS58", JSON.stringify(chainSS58));

      await cryptoWaitReady();
      const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

      // 2. Contract Instantiation
      const contract = new ContractPromise(api, contractAbi, contractAddress);

      // 3. Definition of the call arguments

      const gasLimit = api.registry.createType("WeightV2", {
        refTime: new BN("10000000000"),
        proofSize: new BN("10000000000"),
      }) as WeightV2;

      // if null is passed, unlimited balance can be used
      const storageDepositLimit = null;

      // 4. Call of the contract's function

      const savedAccount = localStorage.getItem("currentAccount");
      const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
      console.log({ parsedAccount });
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.addAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        accountId
      );
      console.log({ addAdminResult });
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });

      const allAdmins = await contract.query.getAllAdmins(caller, {
        value: 0,
        gasLimit,
        storageDepositLimit,
      });
      const temp: FetchResult = allAdmins.output?.toJSON() as FetchResult;
      console.log({ allAdmins }, temp.ok);
      setAdminList(temp.ok);

      const allSuperAdmins = await contract.query.getAllSuperAdmins(caller, {
        value: 0,
        gasLimit,
        storageDepositLimit,
      });
      const syperTemp: FetchResult = allSuperAdmins.output?.toJSON() as FetchResult;
      console.log({ allSuperAdmins }, syperTemp.ok);
      setSuperAdminList(syperTemp.ok);
      console.log({ superAdminList });

    }

    fetchIsVerifiedArtist()
      .then((result: any) => {
        setArtistVerifiedState(result?.Ok);
        setIsLoading(false);
        console.log(result);
      })
      .catch(console.error);
  }, []);

  // In this case, we are waiting for a bool response from the contract
  return (
    <section className="projects section-padding style-12">
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-6">
            All Admin Lists
            {adminList.map((account: string) => (
              <p key={account} className="ps-1">{account}</p>
            ))}
          </div>
          <div className="col-sm-6">
            All Super Admin Lists
            {superAdminList.map((account: string) => (
              <p key={account} className="ps-1">{account}</p>
            ))}
          </div>
        </div>
      </div>
      {/* <h1>{isLoading && "Loading..."}</h1>
            <h1>{!isLoading  && isVerified && "Artist is verified"}</h1> 
            <h1>{!isLoading  && !isVerified && "Artist is not verified"}</h1> */}
    </section>
  );
};

export default ContractAdmin;

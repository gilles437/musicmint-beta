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

const ContractAdmin = () => {
  const [isVerified, setArtistVerifiedState] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [adminList, setAdminList] = useState<string[]>([]);
  const [superAdminList, setSuperAdminList] = useState<[]>([]);

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
      const contractAddress =
        "5FZCvuohqLZd1haUKtDXNkYFZzDJKDWg7c2Ltj88MPDsWMXK"; // Replace the address of your contract
      const contract = new ContractPromise(api, contractAbi, contractAddress);

      // 3. Definition of the call arguments
      const caller = "5HfvsrJHuNH2t97RgHMqh8WhMTrm32DDYjcWkD9HLsZtyf1J";
      const accountId = "5HToLMuPVs9ExBrcWP1wPmtYxToB1TtmQYab7MdQxsmUaGTX"; // Replace by your function argument
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
      console.log({ allAdmins }, allAdmins.output?.toJSON());

      // const adminContract = new AdminContract(contractAddress, alicePair, api);
      // console.log({ adminContract });
      // await adminContract.tx.addAdmin("5D4Q5sf67ZyNNLsRff8g2hWa5T3Z9HeCfbC9EXV8b1x7uVmy");
      // const allAdmins = await adminContract.query.getAllAdmins();
      // console.log({ allAdmins }, allAdmins.value.ok);

      // let tempList: string[] = []
      // allAdmins.value.ok?.forEach(account =>{
      //   tempList.push(account.toString())
      // })
      // setAdminList(tempList)
      // if (result.isOk) {
      //   return output?.toHuman(); // Return the result of the function
      // } else {
      //   throw new Error('Error during contract call');
      // }
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
            <div></div>
          </div>
          <div className="col-sm-6">col-sm-4</div>
        </div>
      </div>
      {/* <h1>{isLoading && "Loading..."}</h1>
            <h1>{!isLoading  && isVerified && "Artist is verified"}</h1> 
            <h1>{!isLoading  && !isVerified && "Artist is not verified"}</h1> */}
    </section>
  );
};

export default ContractAdmin;
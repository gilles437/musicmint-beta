import { useState, useEffect } from "react";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import contractAbi from "./admin.json"; // Replace by your contract ABI
import { BN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { AddressOrPair } from "@polkadot/api/types";

interface FetchResult {
  ok: string[];
}

const ContractAdmin = () => {
  const [api, setApi] = useState<ApiPromise>();
  const [contract, setContract] = useState<ContractPromise>();
  const [keyring, setKeyring] = useState<Keyring>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [ss58Format, setSs58Format] = useState<number>(42);
  const [adminList, setAdminList] = useState<string[]>([]);
  const [superAdminList, setSuperAdminList] = useState<[]>([]);
  const [isAdminListChanged, setIsAdminListChanged] = useState<number>(0);
  const [isSuperAdminListChanged, setSuperIsAdminListChanged] =
    useState<number>(0);

  const wsProvider = new WsProvider("wss://rpc-test.allfeat.io");
  const contractAddress = "5CDR39HB2UiBwozs584p4AhmCkAueFsVSxHBMpUpZypJoo5g"; // Replace the address of your contract
  const caller = "5HfvsrJHuNH2t97RgHMqh8WhMTrm32DDYjcWkD9HLsZtyf1J"; //The address of Contract Owner
  const accountId = "5GYgwUxoyRiuU3kHMRdUub7q4bNSjG1bipVfzqqxutWoQxzc"; // Replace by your function argument
  const storageDepositLimit = null;

  // useEffect(() => {
  //   async function connectChain() {
  //     //Connect Chain for API
  //     const apiResult = await ApiPromise.create({ provider: wsProvider });
  //     setApi(apiResult);
  //     const { chainSS58, chainDecimals, chainTokens } = apiResult.registry;
  //     const { genesisHash } = apiResult;
  //     console.log({ chainSS58, chainDecimals, chainTokens, genesisHash });
  //     localStorage.setItem("chainSS58", JSON.stringify(chainSS58));
  //     setSs58Format(chainSS58 ? chainSS58 : 42);

  //     //Contract Create
  //     const contract = new ContractPromise(
  //       apiResult,
  //       contractAbi,
  //       contractAddress
  //     );
  //     setContract(contract);

  //     //Set Kerying
  //     const keyring = new Keyring({ type: "sr25519", ss58Format: ss58Format });
  //     setKeyring(keyring);

  //     //GasLimit
  //     const gasLimit = apiResult.registry.createType("WeightV2", {
  //       refTime: new BN("10000000000"),
  //       proofSize: new BN("10000000000"),
  //     }) as WeightV2;
  //     setGasLimit(gasLimit);

  //     //Connect Wallet for Injector
  //     web3Enable("subwallet-js");
  //     await cryptoWaitReady();
  //   }
  //   connectChain()
  //     .then((result: any) => {})
  //     .catch(console.error);
  // }, []);

  // useEffect(() => {
  //   async function getAdminList() {
  //     if (contract) {
  //       const allAdmins = await contract.query.getAllAdmins(caller, {
  //         value: 0,
  //         gasLimit,
  //         storageDepositLimit,
  //       });
  //       const temp: FetchResult = allAdmins.output?.toJSON() as FetchResult;
  //       console.log({ allAdmins }, temp.ok);
  //       setAdminList(temp.ok);
  //     }
  //   }
  //   getAdminList()
  //     .then((result: any) => {
  //       console.log("getAdminList", result);
  //     })
  //     .catch(console.error);
  // }, [api, contract, isAdminListChanged]);

  // useEffect(() => {
  //   async function getSuperAdminList() {
  //     if (contract) {
  //       const allSuperAdmins = await contract.query.getAllSuperAdmins(caller, {
  //         value: 0,
  //         gasLimit,
  //         storageDepositLimit,
  //       });
  //       const superTemp: FetchResult =
  //         allSuperAdmins.output?.toJSON() as FetchResult;
  //       console.log({ allSuperAdmins }, superTemp.ok);
  //       setSuperAdminList(superTemp.ok);
  //       console.log({ superAdminList });
  //     }
  //   }
  //   getSuperAdminList()
  //     .then((result: any) => {
  //       console.log("getSuperAdminList", result);
  //     })
  //     .catch(console.error);
  // }, [api, contract, isSuperAdminListChanged]);

  // const setAdmin = async () => {
  //   if (keyring && contract) {
  //     const savedAccount = localStorage.getItem("currentAccount");
  //     const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
  //     console.log({ parsedAccount });
  //     const injector = await web3FromAddress(parsedAccount);
  //     const options = injector ? { signer: injector.signer } : undefined;
  //     const signer: AddressOrPair = injector
  //       ? parsedAccount
  //       : keyring.getPair(parsedAccount);

  //     const addAdminResult = await contract.tx.addAdmin(
  //       { value: 0, gasLimit, storageDepositLimit },
  //       accountId
  //     );
  //     console.log({ addAdminResult });
  //     const txr = await addAdminResult.signAndSend(signer, options);
  //     console.log({ txr });

  //     const count = isAdminListChanged + 1;
  //     setIsAdminListChanged(count);
  //   }
  // };

  // const setSuperAdmin = async () => {
  //   if (keyring && contract) {
  //     const savedAccount = localStorage.getItem("currentAccount");
  //     const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
  //     console.log({ parsedAccount });
  //     const injector = await web3FromAddress(parsedAccount);
  //     const options = injector ? { signer: injector.signer } : undefined;
  //     const signer: AddressOrPair = injector
  //       ? parsedAccount
  //       : keyring.getPair(parsedAccount);

  //     const addAdminResult = await contract.tx.addSuperAdmin(
  //       { value: 0, gasLimit, storageDepositLimit },
  //       accountId
  //     );
  //     console.log({ addAdminResult });
  //     const txr = await addAdminResult.signAndSend(signer, options);
  //     console.log({ txr });

  //     const count = isSuperAdminListChanged + 1;
  //     setSuperIsAdminListChanged(count);
  //   }
  // };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center">
          <h1>Admins</h1>
        </div>

        <div className="mt-5">
          <div className="row mt-1">
            <div className="col-sm-6">
              <h2>Admins Section</h2>
              <input type="text" placeholder="Enter Address..." />
            </div>
            <div className="col-sm-3">
              <h5>Role</h5>
              <h5>Creator</h5>
            </div>
            <div className="col-sm-3">
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                Add Admin
              </button>
            </div>
          </div>

          <table className="table table-hover table-success table-striped mt-2">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
                <th scope="col">Created On</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> account</th>
                <td>Admin</td>
                <td></td>
                <td>
                  <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                    Remove Admin
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <div className="row">
            <div className="col-sm-6">
              <h2>Super Admins Section</h2>
              <input type="text" placeholder="Enter Address..." />
            </div>
            <div className="col-sm-6">
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                Add Super Admin
              </button>
            </div>
          </div>

          <table className="table table-hover table-success table-striped mt-2">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Address</th>
                <th scope="col">Created On</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> account</th>
                <td></td>
                <td>
                  <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                    Remove Admin
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ContractAdmin;

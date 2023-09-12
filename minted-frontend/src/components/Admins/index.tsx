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
  // const [api, setApi] = useState<ApiPromise>();
  const [contract, setContract] = useState<ContractPromise>();
  const [keyring, setKeyring] = useState<Keyring>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [ss58Format, setSs58Format] = useState<number>(42);
  const [newAdminInput, setNewAdminInput] = useState<string>("");
  const [newSuperAdminInput, setNewSuperAdminInput] = useState<string>("");
  const [adminList, setAdminList] = useState<string[]>([]);
  const [superAdminList, setSuperAdminList] = useState<[]>([]);
  const [isAdminListChanged, setIsAdminListChanged] = useState<number>(0);
  const [isSuperAdminListChanged, setSuperIsAdminListChanged] =
    useState<number>(0);

  const contractAddress = "5HKi9fceCSig1HE9vj4CrC4YXpXRfaXWsRHH81dCAnVY1Km7"; // Replace the address of your contract
  const caller = "5FNj1E5Wxqg1vMo1qd6Zi6XZjrAXB8ECuXCyHDrsRQZSAPHL"; //The address of Contract Owner
  const storageDepositLimit = null;
  const savedAccount = localStorage.getItem("currentAccount");
  const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
  console.log({ parsedAccount });

  useEffect(() => {
    async function connectChain() {
      //Connect Chain for API
      const wsProvider = await new WsProvider("wss://rpc-test.allfeat.io");
      console.log({ wsProvider });
      // let _api = new ApiPromise();
      // _api.disconnect();
      let _api = await ApiPromise.create({ provider: wsProvider });
      console.log({ _api });
      const { chainSS58, chainDecimals, chainTokens } = _api.registry;
      const { genesisHash } = _api;
      console.log({ chainSS58, chainDecimals, chainTokens, genesisHash });
      localStorage.setItem("chainSS58", JSON.stringify(chainSS58));
      setSs58Format(chainSS58 ? chainSS58 : 42);

      //Contract Create
      const contract = new ContractPromise(_api, contractAbi, contractAddress);
      setContract(contract);

      //Set Kerying
      const keyring = new Keyring({ type: "sr25519", ss58Format: ss58Format });
      setKeyring(keyring);

      //GasLimit
      const gasLimit = _api.registry.createType("WeightV2", {
        refTime: new BN("10000000000"),
        proofSize: new BN("10000000000"),
      }) as WeightV2;
      setGasLimit(gasLimit);

      //Connect Wallet for Injector
      web3Enable("subwallet-js");
      await cryptoWaitReady();
    }
    connectChain()
      .then((result: any) => {})
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function getAdminList() {
      console.log("getAdminList", contract);
      if (contract) {
        const allAdmins = await contract.query.getAllAdmins(caller, {
          value: 0,
          gasLimit,
          storageDepositLimit,
        });
        const temp: FetchResult = allAdmins.output?.toJSON() as FetchResult;
        console.log({ allAdmins }, temp.ok);
        setAdminList(temp.ok);
        console.log({ adminList });
      }
    }
    getAdminList()
      .then((result: any) => {})
      .catch(console.error);
  }, [contract, isAdminListChanged]);

  useEffect(() => {
    async function getSuperAdminList() {
      console.log("getSuperAdminList", contract);
      if (contract) {
        const allSuperAdmins = await contract.query.getAllSuperAdmins(caller, {
          value: 0,
          gasLimit,
          storageDepositLimit,
        });
        const superTemp: FetchResult =
          allSuperAdmins.output?.toJSON() as FetchResult;
        console.log({ allSuperAdmins }, superTemp.ok);
        setSuperAdminList(superTemp.ok);
        console.log({ superAdminList });
      }
    }
    getSuperAdminList()
      .then((result: any) => {})
      .catch(console.error);
  }, [contract, isSuperAdminListChanged]);

  const addAdmin = async () => {
    if (keyring && contract) {
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
        newAdminInput
      );
      console.log({ addAdminResult });
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });

      const count = isAdminListChanged + 1;
      setIsAdminListChanged(count);
    }
  };

  const addSuperAdmin = async () => {
    if (keyring && contract) {
      const savedAccount = localStorage.getItem("currentAccount");
      const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
      console.log({ parsedAccount });
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.addSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        newSuperAdminInput
      );
      console.log({ addAdminResult });
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });

      const count = isSuperAdminListChanged + 1;
      setSuperIsAdminListChanged(count);
    }
  };

  const removeAdmin = async (account: string) => {
    if (keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.removeAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account
      );
      console.log({ addAdminResult });
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });

      const count = isAdminListChanged + 1;
      setIsAdminListChanged(count);
    }
  };

  const removeSuperAdmin = async (account: string) => {
    if (keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.removeSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account
      );
      console.log({ addAdminResult });
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });

      const count = isSuperAdminListChanged + 1;
      setSuperIsAdminListChanged(count);
    }
  };

  const handleAddAdminChange = (event: any) => {
    setNewAdminInput(event.target.value);
    console.log("handleAddNewAdminChange value is:", event.target.value);
  };

  const handleAddSuperAdminChange = (event: any) => {
    setNewSuperAdminInput(event.target.value);
    console.log("handleAddSuperAdminChange value is:", event.target.value);
  };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="mb-5">
          <h2 className="mt-3">Admins Section</h2>
          <div className="row mt-3">
            <div className="col-sm-6">
              <input
                type="text"
                placeholder="Enter Address..."
                onChange={handleAddAdminChange}
                value={newAdminInput}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div
              className="col-sm-6"
              style={{ alignItems: "flex-end", display: "flex" }}
            >
              <button
                onClick={(e) => addAdmin()}
                className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              >
                Add Admin
              </button>
            </div>
          </div>

          <div className="mt-5 table-responsive-md" style={{ width: "80%" }}>
            <table className="table table-hover table-success table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Created On</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((account: string) => (
                  <tr key={account}>
                    <th scope="row">{account}</th>
                    <td></td>
                    <td>
                      <button
                        onClick={(e) => removeAdmin(account)}
                        className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                      >
                        Remove Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="mt-3">Super Admins Section</h2>
          <div className="row mt-3">
            <div className="col-sm-6">
              <input
                type="text"
                placeholder="Enter Address..."
                onChange={handleAddSuperAdminChange}
                value={newSuperAdminInput}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div
              className="col-sm-6"
              style={{ alignItems: "flex-end", display: "flex" }}
            >
              <button
                onClick={(e) => addSuperAdmin()}
                className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              >
                Add Super Admin
              </button>
            </div>
          </div>

          <div className="mt-5 table-responsive-md" style={{ width: "80%" }}>
            <table className="table table-hover table-success table-striped ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Created On</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {superAdminList.map((account: string) => (
                  <tr>
                    <th scope="row"> {account}</th>
                    <td></td>
                    <td>
                      <button
                        onClick={(e) => removeSuperAdmin(account)}
                        className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                      >
                        Remove Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractAdmin;

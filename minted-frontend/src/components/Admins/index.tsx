import { useState, useEffect, CSSProperties } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import contractAbi from "./admin.json"; // Replace by your contract ABI
import { BN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";
import { AddressOrPair } from "@polkadot/api/types";
import keyring from "@polkadot/ui-keyring";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContractFile } from "./admin";
import { CodePromise } from "@polkadot/api-contract";
import CircleLoader from "react-spinners/ClipLoader";
import { useApi } from "@/hooks/useApi";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

interface FetchResult {
  ok: [];
}

const ContractAdmin = () => {
  const [contract, setContract] = useState<ContractPromise>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [newAdminInput, setNewAdminInput] = useState<string>("");
  const [newSuperAdminInput, setNewSuperAdminInput] = useState<string>("");
  const [adminList, setAdminList] = useState<string[]>([]);
  const [superAdminList, setSuperAdminList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();

  const contractAddress = "5HKi9fceCSig1HE9vj4CrC4YXpXRfaXWsRHH81dCAnVY1Km7"; // Replace the address of your contract
  const caller = "5FNj1E5Wxqg1vMo1qd6Zi6XZjrAXB8ECuXCyHDrsRQZSAPHL"; //The address of Contract Owner
  const storageDepositLimit = null;

  useEffect(() => {
    const connectChain = async () => {
      // //Connect Wallet for Injector
      await web3Enable("polkadot-js");
      await cryptoWaitReady();

      //Connect Chain for API
      setIsLoading(true);
      if (api == null) return;
      const { chainSS58, chainDecimals, chainTokens } = api.registry;
      localStorage.setItem("chainSS58", JSON.stringify(chainSS58));

      //Contract Create
      const contract = new ContractPromise(api, contractAbi, contractAddress);
      setContract(contract);

      //Set Kerying
      keyring.loadAll({
        ss58Format: chainSS58,
        type: "sr25519",
      });
      
      //GasLimit
      const gasLimit = api.registry.createType("WeightV2", {
        refTime: new BN("10000000000"),
        proofSize: new BN("10000000000"),
      }) as WeightV2;
      setGasLimit(gasLimit);
    };
    connectChain()
      .then(() => {
        if (api == null) return;
        setIsLoading(false);
      })
      .catch(console.error);
  }, [api]);

  useEffect(() => {
    getAdminList()
      .then((result: any) => {})
      .catch(console.error);
    getSuperAdminList()
      .then((result: any) => {})
      .catch(console.error);
  }, [contract]);

  const getAdminList = async () => {
    if (contract) {
      const allAdmins = await contract.query.getAllAdmins(caller, {
        value: 0,
        gasLimit,
        storageDepositLimit,
      });
      const stringTemp = allAdmins.output?.toString()
        ? allAdmins.output?.toString()
        : "";
      const temp: FetchResult = JSON.parse(stringTemp);
      console.log({ stringTemp, temp });
      setAdminList(temp.ok);
      console.log({ adminList });
    }
  };

  const getSuperAdminList = async () => {
    if (contract) {
      const allSuperAdmins = await contract.query.getAllSuperAdmins(caller, {
        value: 0,
        gasLimit,
        storageDepositLimit,
      });
      const stringTemp = allSuperAdmins.output?.toString()
        ? allSuperAdmins.output?.toString()
        : "";
      const temp: FetchResult = JSON.parse(stringTemp);
      setSuperAdminList(temp.ok);
    }
  };

  const addAdmin = async () => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    let allAccounts: string[] = adminList.concat(superAdminList);
    if (
      parsedAccount &&
      superAdminList.findIndex((account: string) => {
        return account == parsedAccount;
      }) < 0
    ) {
      toastFunction("Current selected account is not SuperAdmin !");
    } else if (!newAdminInput) {
      toastFunction("You should input address !");
    } else if (
      allAccounts.findIndex((account: string) => {
        return account == newAdminInput.toString();
      }) >= 0
    ) {
      toastFunction("Account is already added !");
    } else if (newAdminInput && keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.addAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        newAdminInput
      );
      const txr = await addAdminResult.signAndSend(signer, options);

      const timerId = setTimeout(async () => {
        await getAdminList();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const addSuperAdmin = async () => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    let allAccounts: string[] = adminList.concat(superAdminList);
    if (parsedAccount && caller != parsedAccount) {
      toastFunction("Current selected account is not Contract Owner !");
    } else if (!newSuperAdminInput) {
      toastFunction("You should input address !");
    } else if (
      allAccounts.findIndex((account: string) => {
        return account == newSuperAdminInput.toString();
      }) >= 0
    ) {
      toastFunction("Account is already added !");
    } else if (newSuperAdminInput && keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.addSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        newSuperAdminInput
      );
      const txr = await addAdminResult.signAndSend(signer, options);

      const timerId = setTimeout(async () => {
        await getSuperAdminList();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const removeAdmin = async (account: string) => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    if (
      parsedAccount &&
      superAdminList.findIndex((account: string) => {
        return account == parsedAccount;
      }) < 0
    ) {
      toastFunction("Current selected account is not SuperAdmin !");
    } else if (keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.removeAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account
      );
      const txr = await addAdminResult.signAndSend(signer, options);
      console.log({ txr });
      const timerId = setTimeout(async () => {
        await getAdminList();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const removeSuperAdmin = async (account: string) => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    if (parsedAccount && parsedAccount != caller) {
      toastFunction("Current selected account is not Contract Owner !");
    } else if (keyring && contract) {
      const injector = await web3FromAddress(parsedAccount);
      const options = injector ? { signer: injector.signer } : undefined;
      const signer: AddressOrPair = injector
        ? parsedAccount
        : keyring.getPair(parsedAccount);

      const addAdminResult = await contract.tx.removeSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account
      );
      const txr = await addAdminResult.signAndSend(signer, options);

      const timerId = setTimeout(async () => {
        await getSuperAdminList();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const handleAddAdminChange = (event: any) => {
    setNewAdminInput(event.target.value);
  };

  const handleAddSuperAdminChange = (event: any) => {
    setNewSuperAdminInput(event.target.value);
  };

  const deployAdminContract1 = async () => {
    if (api && keyring) {
      const __contract = JSON.parse(ContractFile);
      const code = new CodePromise(api, __contract, __contract.source.wasm);
      const savedAccount = localStorage.getItem("currentAccount");
      const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
      const injector = await web3FromAddress(parsedAccount);
      // const options = injector ? { signer: injector.signer } : undefined;
      // console.log({ options, injector });
      // const signer: AddressOrPair = injector
      //   ? parsedAccount
      //   : keyring.getPair(parsedAccount);

      // console.log({ signer });
      const tx = code.tx.new(
        { value: 0, gasLimit, storageDepositLimit },
        parsedAccount
      );
      const unsub = await tx.signAndSend(
        parsedAccount,
        { signer: injector.signer },
        ({ status, events }) => {
          if (status.isInBlock || status.isFinalized) {
            console.log({ status, events });
            // address = contractD.address.toString();
            events
              .filter(({ event }) =>
                api.events.contracts.Instantiated.is(event)
              )
              .forEach(
                ({
                  event: {
                    data: [deployer, contract],
                  },
                }) => {
                  console.log(`contract address: ${contract}`);
                }
              );
            unsub();
          }
        }
      );

    }
  };

  const toastFunction = (string: any) => {
    toast.warn(string, { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        {isLoading ? (
          <CircleLoader
            color="#36d7b7"
            loading={isLoading}
            size={350}
            cssOverride={override}
          />
        ) : (
          <div>
            <div className="mb-5">
              <button
                onClick={(e) => deployAdminContract1()}
                className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              >
                Deploy Contract
              </button>
              <h2 className="mt-3">Artists Section</h2>
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
                    Add Artist
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-9">
                  <div className="mt-5 table-responsive">
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
                                Remove Artist
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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

              <div className="row">
                <div className="col-sm-12 col-md-9">
                  <div className="mt-5 table-responsive">
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
                          <tr key={account}>
                            <th scope="row"> {account}</th>
                            <td></td>
                            <td>
                              <button
                                onClick={(e) => removeSuperAdmin(account)}
                                className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                              >
                                Remove Super Admin
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        autoClose={5000}
        pauseOnHover
        pauseOnFocusLoss
        draggable
      />
    </section>
  );
};

export default ContractAdmin;

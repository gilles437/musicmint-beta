import { useState, useEffect, CSSProperties } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import { WeightV2 } from "@polkadot/types/interfaces";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContractFile as AlbumContract } from "@/contracts/album/albums1";
import { CodePromise } from "@polkadot/api-contract";
import { useApi } from "@/hooks/useApi";
import { useWallets } from "@/contexts/Wallets";
import { beatifyAddress } from "@/utils/account";
import Identicon from "@polkadot/react-identicon";
import { CodeSubmittableResult } from "@polkadot/api-contract/base";
import {
  useSelector,
  useDispatch,
  setLoadingStatus,
  setArtists,
} from '@/lib/redux';
import { useAdminContract } from "@/hooks/useAdminContract";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
interface FetchResult {
  ok: [];
}

interface FetchStringResult {
  ok: string;
}

interface adminListType {
  to: string;
  contract: string;
  timestamp: string;
}

interface SuperAdmin {
  to: string;
  timestamp: string;
}

interface fetchType {
  transfers: [];
}

const ArtistsSection = () => {
  const dispatch = useDispatch()
  const { artists: artistList, loadingArtists } = useSelector(state => state.admin);
  
  const [contract, setContract] = useState<ContractPromise>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [newAdminInput, setNewAdminInput] = useState<string>("");
  const [superAdminList, setSuperAdminList] = useState<SuperAdmin[]>(
    []
  );
  const { getArtists } = useAdminContract();

  const api = useApi();
  const { wallet } = useWallets();

  // const contractAddress = "5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG"; // Replace the address of your contract
  const caller = "5FNj1E5Wxqg1vMo1qd6Zi6XZjrAXB8ECuXCyHDrsRQZSAPHL"; //The address of Contract Owner
  const storageDepositLimit = null;

  useEffect(() => {
    // const connectChain = async () => {
    //   if (api == null) return;
    //   const { chainSS58, chainDecimals, chainTokens } = api.registry;
    //   localStorage.setItem("chainSS58", JSON.stringify(chainSS58));

    //   //Contract Create
    //   const contract = new ContractPromise(api, contractAbi, contractAddress);
    //   setContract(contract);

    //   //GasLimit
    //   const gasLimit = api.registry.createType("WeightV2", {
    //     refTime: new BN("10000000000"),
    //     proofSize: new BN("10000000000"),
    //   }) as WeightV2;
    //   setGasLimit(gasLimit);
    // };
    // connectChain()
    //   .then(() => {
    //     if (api == null) return;
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     setIsLoading(false);
    //   });

    dispatch(setLoadingStatus(true));
    getArtists(caller).then(artists => {
      artists && dispatch(setArtists(artists));
      dispatch(setLoadingStatus(false));
    });

  }, [api]);

  const addAdmin = async (newContractAddress: string) => {
    if (newAdminInput && contract && wallet) {
      console.log({ newContractAddress, newAdminInput });
      const options = wallet ? { signer: wallet.signer } : undefined;
      const addAdminResult = await contract.tx.addAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        newAdminInput,
        newContractAddress
      );
      const savedAccount = localStorage.getItem("currentAccount");
      const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
      await addAdminResult.signAndSend(parsedAccount, options);
      setNewAdminInput("");

      const timerId = setTimeout(() => getArtists(caller), 5000);
      return () => clearTimeout(timerId);
    }
  };

  const removeAdmin = async (account: string) => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    if (
      parsedAccount &&
      superAdminList.findIndex((account: SuperAdmin) => {
        return account.to == parsedAccount;
      }) < 0
    ) {
      toastFunction("Current selected account is not SuperAdmin !");
    } else if (wallet && contract) {
      let removeItem = artistList.find(
        (item: adminListType) => item.to == account
      );
      const options = wallet ? { signer: wallet.signer } : undefined;
      const addAdminResult = await contract.tx.removeAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account,
        removeItem?.contract
      );
      await addAdminResult.signAndSend(parsedAccount, options);
      setNewAdminInput("");

      const timerId = setTimeout(() => getArtists(caller), 5000);
      return () => clearTimeout(timerId);
    }
  };

  const handleAddAdminChange = (event: any) => {
    setNewAdminInput(event.target.value);
  };

  const deployAdminContract = async () => {
    const __albumContract = AlbumContract;
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    let allAccounts: string[] = [];
    superAdminList.map((item: SuperAdmin) => {
      allAccounts.push(item.to);
    });
    artistList.map((item: adminListType) => {
      allAccounts.push(item.to);
    });
    if (
      parsedAccount &&
      superAdminList.findIndex((account: SuperAdmin) => {
        return account.to == parsedAccount;
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
    } else if (newAdminInput && contract && wallet && api) {
      const code = new CodePromise(
        api,
        __albumContract,
        __albumContract.source.wasm
      );
      const tx = code.tx.new(
        { value: 0, gasLimit, storageDepositLimit: null },
        "",
        newAdminInput
      );
      const unsub = await tx.signAndSend(
        parsedAccount,
        { signer: wallet.signer },
        (result) => {
          if (result.status.isFinalized) {
            const dataResult: CodeSubmittableResult<"promise"> = result;
            if (dataResult.contract) {
              let address = dataResult.contract.address.toString();
              addAdmin(address);
            }
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
    <div className="mb-5">
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
            onClick={(e) => deployAdminContract()}
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          >
            Add Artist
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="mt-5 table-responsive">
            <table className="table table-hover table-success table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Contract Address</th>
                  <th scope="col">Created On</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {artistList.map(
                  (adminAccount: adminListType, index: number) => (
                    <tr key={index}>
                      <th scope="row">
                        {adminAccount.to ? (
                          <div className="d-flex">
                            <p className="ps-1">
                              {beatifyAddress(adminAccount.to)}
                            </p>
                            <Identicon
                              value={adminAccount.to}
                              size={32}
                              theme="polkadot"
                              className="pe-1"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </th>
                      <th scope="row">
                        {adminAccount.contract ? (
                          <div className="d-flex">
                            <p className="ps-1">
                              {beatifyAddress(adminAccount.contract)}
                            </p>
                            <Identicon
                              value={adminAccount.contract}
                              size={32}
                              theme="polkadot"
                              className="pe-1"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </th>
                      <td>
                        {adminAccount.timestamp
                          ? adminAccount.timestamp
                          : ""}
                      </td>
                      <td>
                        <button
                          onClick={(e) => removeAdmin(adminAccount.to)}
                          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                        >
                          Remove Artist
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsSection;

import { useState, useEffect, useCallback } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import { BN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contractAbi from "@/contracts/admin/admin.json"; // Replace by your contract ABI
import { useApi } from "@/hooks/useApi";
import { useWallets } from "@/contexts/Wallets";
import { beatifyAddress } from "@/utils/account";
import Identicon from "@polkadot/react-identicon";
import {
  useSelector,
  useDispatch,
  selectSuperAdmins,
  fetchSuperAdminListAsync,
  SuperAdmin,
} from "@/lib/redux";

interface adminListType {
  to: string;
  contract: string;
  timestamp: string;
}

const toastFunction = (string: any) => {
  toast.warn(string, { position: toast.POSITION.TOP_RIGHT });
};

const SuperAdminSection = () => {
  const dispatch = useDispatch();
  const superAdminList = useSelector(selectSuperAdmins);

  const [contract, setContract] = useState<ContractPromise>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [newSuperAdminInput, setNewSuperAdminInput] = useState<string>("");
  const [adminList, setAdminList] = useState<adminListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = useApi();
  const { wallet } = useWallets();

  const contractAddress = "5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG"; // Replace the address of your contract
  const caller = "5FNj1E5Wxqg1vMo1qd6Zi6XZjrAXB8ECuXCyHDrsRQZSAPHL"; //The address of Contract Owner
  const storageDepositLimit = null;

  useEffect(() => {
    const connectChain = async () => {
      if (api == null) return;
      setIsLoading(true);
      const { chainSS58, chainDecimals, chainTokens } = api.registry;
      localStorage.setItem("chainSS58", JSON.stringify(chainSS58));

      //Contract Create
      const contract = new ContractPromise(api, contractAbi, contractAddress);
      setContract(contract);

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
      .catch(() => {
        setIsLoading(false);
      });
  }, [api]);

  const fetchSuperAdminList = useCallback(() => {
    dispatch(fetchSuperAdminListAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchSuperAdminList();
  }, []);

  const addSuperAdmin = async () => {
    if (!newSuperAdminInput) {
      toastFunction("You should input address !");
      return;
    }

    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    if (parsedAccount && caller != parsedAccount) {
      toastFunction("Current selected account is not Contract Owner !");
      return;
    }

    const allAdminAccounts = [
      ...superAdminList.map((a) => a.to),
      ...adminList.map((a) => a.to),
    ];
    if (allAdminAccounts.includes(newSuperAdminInput)) {
      toastFunction("Account is already added !");
      return;
    }

    if (wallet && contract) {
      const options = wallet.signer ? { signer: wallet.signer } : undefined;
      const tx = await contract.tx.addSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        newSuperAdminInput
      );
      await tx.signAndSend(parsedAccount, options);
      setNewSuperAdminInput("");

      const timerId = setTimeout(fetchSuperAdminList, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const removeSuperAdmin = async (account: string) => {
    const savedAccount = localStorage.getItem("currentAccount");
    const parsedAccount = savedAccount ? JSON.parse(savedAccount) : "";
    if (parsedAccount && parsedAccount != caller) {
      toastFunction("Current selected account is not Contract Owner !");
      return;
    }

    if (wallet && contract) {
      const options = wallet ? { signer: wallet.signer } : undefined;
      const tx = await contract.tx.removeSuperAdmin(
        { value: 0, gasLimit, storageDepositLimit },
        account
      );
      await tx.signAndSend(parsedAccount, options);
      setNewSuperAdminInput("");

      const timerId = setTimeout(fetchSuperAdminList, 5000);
      return () => clearTimeout(timerId);
    }
  };

  const handleAddSuperAdminChange = (event: any) => {
    setNewSuperAdminInput(event.target.value);
  };

  return (
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
        <div className="col-sm-12 col-md-12">
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
                {superAdminList.map(
                  (superAdminAccount: SuperAdmin, index: number) => (
                    <tr key={index}>
                      <th scope="row">
                        {superAdminAccount.to ? (
                          <div className="d-flex">
                            <p className="ps-1">
                              {beatifyAddress(superAdminAccount.to)}
                            </p>
                            <Identicon
                              value={superAdminAccount.to}
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
                        {" "}
                        {superAdminAccount.timestamp
                          ? superAdminAccount.timestamp
                          : ""}
                      </td>
                      <td>
                        <button
                          onClick={(e) =>
                            removeSuperAdmin(superAdminAccount.to)
                          }
                          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                        >
                          Remove Super Admin
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

export default SuperAdminSection;

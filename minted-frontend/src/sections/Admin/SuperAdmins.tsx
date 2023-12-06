import { useState, useEffect, useCallback } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import { WeightV2 } from "@polkadot/types/interfaces";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { useWallets } from "@/contexts/Wallets";
import { beatifyAddress, getActiveAccount } from "@/utils/account";
import Identicon from "@polkadot/react-identicon";
import {
  useSelector,
  useDispatch,
  selectSuperAdmins,
  fetchSuperAdminListAsync,
  SuperAdmin,
} from "@/lib/redux";
import { useFindAddress } from "@/hooks/useFindAddress";
import { useAdminContract } from "@/hooks/useAdminContract";

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
  const superAdmins = useSelector(selectSuperAdmins);
  const [newSuperAdminInput, setNewSuperAdminInput] = useState<string>("");
  const adminContract = useAdminContract();
  const findAddress = useFindAddress();

  const caller = "5FNj1E5Wxqg1vMo1qd6Zi6XZjrAXB8ECuXCyHDrsRQZSAPHL"; //The address of Contract Owner

  const fetchSuperAdminList = useCallback(() => {
    dispatch(fetchSuperAdminListAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchSuperAdminList();
  }, []);

  const isOwner = () => {
    const activeAccount = getActiveAccount();
    return activeAccount && caller === activeAccount;
  };

  const addSuperAdmin = async () => {
    if (!newSuperAdminInput) {
      toastFunction("You should input address !");
      return;
    }

    if (!isOwner()) {
      toastFunction("Current selected account is not Contract Owner !");
      return;
    }

    if (findAddress(newSuperAdminInput)) {
      toastFunction("Account is already added !");
      return;
    }

    const success = await adminContract.addSuperAdmin(newSuperAdminInput);

    if (success) {
      setNewSuperAdminInput("");
      toastFunction("Super admin has been successfully added");

      const timerId = setTimeout(fetchSuperAdminList, 5000);
      return () => clearTimeout(timerId);
    } else {
      toastFunction("Failed to add super admin!");
    }
  };

  const removeSuperAdmin = async (adminAddress: string) => {
    if (!adminAddress) {
      toastFunction("You should input address !");
      return;
    }

    if (!isOwner()) {
      toastFunction("Current selected account is not Contract Owner !");
      return;
    }

    const success = await adminContract.removeSuperAdmin(adminAddress);

    if (success) {
      setNewSuperAdminInput("");
      toastFunction("Super admin has been successfully removed");

      const timerId = setTimeout(fetchSuperAdminList, 5000);
      return () => clearTimeout(timerId);
    } else {
      toastFunction("Failed to remove super admin!");
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
                {(superAdmins || []).map(
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
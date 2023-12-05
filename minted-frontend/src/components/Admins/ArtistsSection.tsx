import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { beatifyAddress, getActiveAccount } from "@/utils/account";
import Identicon from "@polkadot/react-identicon";
import {
  Artist,
  useSelector,
  useDispatch,
  fetchArtistListAsync,
} from "@/lib/redux";
import { useAdminContract } from "@/hooks/useAdminContract";
import { useFindAddress } from "@/hooks/useFindAddress";

const toastFunction = (string: any) => {
  toast.warn(string, { position: toast.POSITION.TOP_RIGHT });
};

const ArtistsSection = () => {
  const dispatch = useDispatch();
  const {
    superAdmins,
    artists: artistList,
    loadingArtists,
  } = useSelector((state) => state.admin);
  const [newAdminInput, setNewAdminInput] = useState<string>("");
  const adminContract = useAdminContract();
  const findAddress = useFindAddress();

  const fetchArtistList = useCallback(() => {
    dispatch(fetchArtistListAsync());
  }, [dispatch]);

  useEffect(() => {
    fetchArtistList();
  }, []);

  const isSuperAdmin = () => {
    // Check if it is super admin.
    const account = getActiveAccount();
    return !!superAdmins.some((i) => i.to === account);
  };

  const addAdmin = async (newContractAddress: string) => {
    if (!newAdminInput) {
      toastFunction("Please input address");
      return;
    }

    if (!newContractAddress) {
      toastFunction("Please contract address");
      return;
    }

    const success = await adminContract.addArtist(
      newAdminInput,
      newContractAddress
    );

    if (success) {
      toastFunction("Artist has been successfully added");
      setNewAdminInput("");
      const timerId = setTimeout(() => fetchArtistList(), 5000);
      return () => clearTimeout(timerId);
    } else {
      toastFunction("Failed to add artist");
    }
  };

  const removeAdmin = async (artistAddress: string) => {
    if (!artistAddress) {
      toastFunction("Please input address");
      return;
    }

    // Check if it is super admin.
    if (!isSuperAdmin()) {
      toastFunction("Current selected account is not SuperAdmin !");
      return;
    }

    const artist = artistList.find((i) => i.to == artistAddress);
    if (!artist) {
      toastFunction("Invalid address!");
      return;
    }

    const success = await adminContract.removeArtist(
      artist.to,
      artist.contract
    );

    if (success) {
      toastFunction("Artist has been successfully removed");
      setNewAdminInput("");
      const timerId = setTimeout(() => fetchArtistList(), 5000);
      return () => clearTimeout(timerId);
    } else {
      toastFunction("Failed to remove artist");
    }
  };

  const handleAddAdminChange = (event: any) => {
    setNewAdminInput(event.target.value);
  };

  const deployAdminContract = async () => {
    if (!newAdminInput) {
      toastFunction("You should input address!");
      return;
    }

    // Check if it is super admin.
    if (!isSuperAdmin()) {
      toastFunction("Current selected account is not SuperAdmin!");
      return;
    }

    if (findAddress(newAdminInput)) {
      toastFunction("Account is already added !");
      return;
    }

    await adminContract.deployArtistContract(
      newAdminInput,
      (contractAddress: string) => {
        addAdmin(contractAddress);
      }
    );
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
                {artistList.map((adminAccount: Artist, index: number) => (
                  <tr key={index}>
                    <th scope="row">
                      {!!adminAccount.to && (
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
                      )}
                    </th>
                    <th scope="row">
                      {!!adminAccount.contract && (
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
                      )}
                    </th>
                    <td>
                      {adminAccount.timestamp
                        ? dayjs(adminAccount.timestamp).format(
                            "MM/DD/YYYY HH:mm"
                          )
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsSection;

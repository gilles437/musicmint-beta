import { useState, useEffect, CSSProperties } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import { BN, BN_ONE, BN_TEN } from "@polkadot/util";
import { WeightV2 } from "@polkadot/types/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contractAbi from "@/contracts/admin/admin.json"; // Replace by your contract ABI
import CircleLoader from "react-spinners/ClipLoader";
import { useApi } from "@/hooks/useApi";
import { useWallets } from "@/contexts/Wallets";
import { beatifyAddress } from "@/utils/account";
import Identicon from "@polkadot/react-identicon";
import { CodeSubmittableResult } from "@polkadot/api-contract/base";
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS } from "@/constants";
import { request } from "graphql-request";
import {
  QUERY_GET_ADMIN_TRANSFERS,
  QUERY_GET_SUPER_ADMIN_TRANSFERS,
} from "@/subgraph/erc721Queries";
import ArtistsSection from "./ArtistsSection";
import SuperAdminSection from "./SuperAdminSection";

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

const ContractAdmin = () => {
  const [contract, setContract] = useState<ContractPromise>();
  const [gasLimit, setGasLimit] = useState<WeightV2>();
  const [adminList, setAdminList] = useState<adminListType[]>([]);
  const [superAdminList, setSuperAdminList] = useState<SuperAdmin[]>(
    []
  );
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

  useEffect(() => {
    getAdminList()
      .then((result: any) => {})
      .catch(console.error);
    getSuperAdminList()
      .then((result: any) => {})
      .catch(console.error);
  }, [contract]);

  const getAdminList = async () => {
    // let result: fetchType = await request(
    //   MARKETPLACE_SUBGRAPH_URLS[DEFAULT_CHAIN],
    //   QUERY_GET_ADMIN_TRANSFERS()
    // );
    // result = mangeTimes(result);
    // console.log("getAdminList", { result });
    // setAdminList(result.transfers);

    if (contract) {
      const allAdmins = await contract.query.getAllAdmins(caller, {
        value: 0,
        gasLimit,
        storageDepositLimit,
      });
      console.log({ allAdmins });
      const stringTemp = allAdmins.output?.toString()
        ? allAdmins.output?.toString()
        : "";
      const temp: FetchResult = JSON.parse(stringTemp);
      let contractAddressArray: adminListType[] = [];
      await Promise.all(
        temp.ok.map(async (admin: string) => {
          const artistContract = await contract.query.getArtistContract(
            caller,
            {
              value: 0,
              gasLimit,
              storageDepositLimit,
            },
            admin
          );
          const contractStringTemp = artistContract.output?.toString()
            ? artistContract.output?.toString()
            : "";
          const contractTemp: FetchStringResult =
            JSON.parse(contractStringTemp);
          contractAddressArray.push({
            to: admin,
            contract: contractTemp.ok,
            timestamp: "",
          });
        })
      );
      console.log({ contractAddressArray });
      setAdminList(contractAddressArray);
    }
  };

  const getSuperAdminList = async () => {
    let result: fetchType = await request(
      MARKETPLACE_SUBGRAPH_URLS[DEFAULT_CHAIN],
      QUERY_GET_SUPER_ADMIN_TRANSFERS()
    );
    result = mangeTimes(result);
    console.log("getSuperAdminList", { result });
    setSuperAdminList(result.transfers);
    // if (contract) {
    //   const allSuperAdmins = await contract.query.getAllSuperAdmins(caller, {
    //     value: 0,
    //     gasLimit,
    //     storageDepositLimit,
    //   });
    //   const stringTemp = allSuperAdmins.output?.toString()
    //   ? allSuperAdmins.output?.toString()
    //   : "";
    //   const temp: FetchResult = JSON.parse(stringTemp);
    //   console.log("getSuperAdminList",{ temp });
    //   let tempData: SuperAdmin[]= [];
    //   temp.ok.map((item: string)=> {
    //     tempData.push({to: item, timestamp: ""})
    //   })
    //   setSuperAdminList(tempData);
    // }
  };

  const mangeTimes = (result: fetchType): fetchType => {
    result.transfers.map((data: adminListType) => {
      let date = data.timestamp.split("T");
      let time = date[1].split(".");
      data.timestamp = date[0] + " " + time[0];
    });
    return result;
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
          <>
            <ArtistsSection />
            <SuperAdminSection />
          </>
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

import { memo } from "react";
import { useWallets } from "@polkadot-onboard/react";
import { BaseWallet } from "@polkadot-onboard/core";
import Wallet from "./Wallet";
import { ToastContainer, toast } from "react-toastify";

const Wallets = () => {
  const { wallets } = useWallets();

  if (!Array.isArray(wallets)) {
    return null;
  }
  console.log("All wallets", wallets);
  let allfeatIndex = -1;
  wallets.map((wallet, index) => {
    if (wallet.metadata.id == "allfeat" || wallet.metadata.title == "allfeat") {
      allfeatIndex = index;
      console.log("allfeatWallet", wallet);
    }
  });

  const Msg = ({ }) => (
    <div>
      <img src="/assets/image/icon/ALLFEAT_logo+points.png" style={{height:"25px", width:"25px"}}></img>
      <a target="_blank" href="https://polkadot.js.org/extension/">No wallet found. Please press here to install Allfeat wallet.</a>
    </div>
  )

  const notify = () =>  toast(<Msg />) 

  // if (allfeatIndex < 0) {
  //   toast(<Msg />) 
  // }

  return (
    <div>
      {allfeatIndex >= 0 ? (
        <Wallet
          key={wallets[allfeatIndex].metadata.title}
          wallet={wallets[allfeatIndex]}
        />
      ) : (
        <>
          <button onClick={notify} className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
            <small>
              <span className="me-1"> <img src="/assets/image/icon/ALLFEAT_logo+points.png" style={{height:"20px", width:"20px"}}></img></span> Connect
            </small>
          </button>
          <ToastContainer
            position="top-right"
            newestOnTop={true}
            autoClose={5000}
            pauseOnHover
            pauseOnFocusLoss
            draggable
          />
        </>
      )}
      {/* {wallets.map((wallet: BaseWallet) => ( */}
      {/* ))} */}
    </div>
  );
};

export default memo(Wallets);

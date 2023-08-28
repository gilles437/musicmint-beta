import { memo } from "react";
import { useWallets } from "@polkadot-onboard/react";
import { BaseWallet } from "@polkadot-onboard/core";
import Wallet from "./Wallet";

const Wallets = () => {
  const { wallets } = useWallets();

  if (!Array.isArray(wallets)) {
    return null;
  }
  console.log("All wallets", wallets);
  let allfeatWallet: BaseWallet = wallets[0];
  wallets.map((wallet) => {
    if (wallet.metadata.id == "allfeat" || wallet.metadata.title == "allfeat") {
      allfeatWallet = wallet;
    }
  });
  // console.log("allfeatWallet", allfeatWallet);

  return (
    <div>
      {/* {wallets.map((wallet: BaseWallet) => ( */}
      <Wallet key={allfeatWallet.metadata.title} wallet={allfeatWallet} />
      {/* ))} */}
    </div>
  );
};

export default memo(Wallets);

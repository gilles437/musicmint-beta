import { memo } from 'react';
import { useWallets } from '@polkadot-onboard/react';
import { BaseWallet } from '@polkadot-onboard/core';
// import Wallet from './Wallet';

const Wallets = () => {
  const { wallets } = useWallets();

  if (!Array.isArray(wallets)) {
    return null;
  }

  return (
    <div>
      {wallets.map((wallet: BaseWallet) => (
        <h1>wallet.metadata.title</h1>
        // <Wallet key={wallet.metadata.title} wallet={wallet} />
      ))}
    </div>
  );
};

export default memo(Wallets);

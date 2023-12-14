'use client';

/* Core */
import { Provider } from 'react-redux';

/* Context */
import PolkadotProvider from '@/contexts/Polkadot';
import WalletProvider from "@/contexts/Wallets";

/* Instruments */
import { reduxStore } from '@/lib/redux';

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PolkadotProvider>
        <WalletProvider>{props.children}</WalletProvider>
      </PolkadotProvider>
    </Provider>
  );
};

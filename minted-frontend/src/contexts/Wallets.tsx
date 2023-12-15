import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { WalletAggregator, BaseWallet, Account } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import {
  PolkadotWalletsContextProvider,
  useWallets as _useWallets,
} from '@polkadot-onboard/react';
import { formatAccount } from '@/utils/account';

const APP_NAME = 'Polkadot Delegation Dashboard';
const CURRENT_ACCOUNT = 'currentAccount';

export type WalletState = 'connected' | 'disconnected';

export interface IWalletContext {
  wallet: BaseWallet | undefined;
  accounts: Account[];
  walletAddress: string | null;
  activeAccount: Account | null;
  setActiveAccount: (account: Account | null) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext({} as IWalletContext);

export const useWallets = () => useContext<IWalletContext>(WalletContext);

const WalletProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { wallets } = _useWallets();
  const [wallet, setWallet] = useState<BaseWallet>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);

  const connect = useCallback(async (wallet: BaseWallet) => {
    await wallet.connect();
    setWallet(wallet);

    const accounts = await wallet.getAccounts();
    setAccounts(accounts);
    console.log('accounts', accounts);

    const savedAddress = localStorage?.getItem(CURRENT_ACCOUNT);
    const savedAccount = accounts.find(a => a.address === savedAddress)
    if (savedAccount) {
      setActiveAccount(savedAccount);
    } else {
      setActiveAccount(accounts[0]);
      localStorage?.setItem(CURRENT_ACCOUNT, accounts[0].address);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (wallet) {
      return connect(wallet);
    }
  }, [wallet, connect]);

  const disconnectWallet = useCallback(async () => {
    if (wallet) {
      await wallet.disconnect();
      setAccounts([]);
      setActiveAccount(null);
      localStorage?.removeItem(CURRENT_ACCOUNT);
    }
  }, [wallet]);

  useEffect(() => {
    const init = async (wallets: Array<BaseWallet>) => {
      const wallet = wallets.find(
        (wallet) =>
          wallet.metadata.id == 'allfeat' || wallet.metadata.title == 'allfeat'
      );
      wallet && connect(wallet);
    };
    wallets && init(wallets);
  }, [wallets, connect]);

  const values = useMemo(() => {
    const walletAddress = activeAccount
      ? formatAccount(activeAccount.address)
      : null;

    return {
      wallet,
      accounts,
      walletAddress,
      activeAccount,
      setActiveAccount,
      connectWallet,
      disconnectWallet,
    };
  }, [
    wallet,
    accounts,
    activeAccount,
    setActiveAccount,
    connectWallet,
    disconnectWallet,
  ]);

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const walletAggregator = new WalletAggregator([
    new InjectedWalletProvider({}, APP_NAME),
  ]);

  return (
    <PolkadotWalletsContextProvider
      walletAggregator={walletAggregator}
      initialWaitMs={1000}
    >
      <WalletProviderInner>{children}</WalletProviderInner>
    </PolkadotWalletsContextProvider>
  );
};

export default WalletProvider;

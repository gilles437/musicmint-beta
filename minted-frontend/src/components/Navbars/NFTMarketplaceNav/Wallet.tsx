import { memo, useEffect, useState } from "react";
import Identicon from "@polkadot/react-identicon";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { BaseWallet, Account } from "@polkadot-onboard/core";

const Wallet = ({ wallet }: { wallet: BaseWallet }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {
    const setupApi = async () => {
      const provider = new WsProvider("wss://westend-rpc.polkadot.io");
      const api = await ApiPromise.create({ provider });
      setApi(api);
    };

    setupApi();
  }, []);

  const walletClickHandler = async (event: React.MouseEvent) => {
    console.log(`wallet clicked!`);
    if (!isBusy) {
      try {
        setIsBusy(true);
        await wallet.connect();
        let accounts = await wallet.getAccounts();
        console.log({ accounts });
        setAccounts(accounts);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        // handle error
      } finally {
        setIsBusy(false);
      }
    }
  };

  const selectAddress = (address: Account) => {
    setCurrentAccount(address);
  };

  const walletDisConnect = () => {
    setAccounts([]);
    setCurrentAccount(null);
  };

  return (
    <div>
      {accounts.length ? (
        <>
          <div className="btn-group">
            <div
              className="dropdown-toggle mousePointer"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Identicon
                value={currentAccount?.address}
                size={32}
                theme="polkadot"
                className="pe-1"
              />
              {beatifyAddress(currentAccount?.address)}
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end mousePointer wallet-connect">
              {accounts.map((account: Account) => (
                <li
                  key={account.address}
                  onClick={() => selectAddress(account)}
                >
                  <div className="dropdown-item d-flex">
                    <Identicon
                      value={account.address}
                      size={32}
                      theme="polkadot"
                      className="pe-1"
                    />
                    <p className="navWallet-item">{beatifyAddress(account.address)}</p>
                  </div>
                </li>
              ))}
              <li>
                <div className="dropdown-item d-flex">
                  <p className="navWallet-item">My Account</p>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex">
                  <p className="navWallet-item">My Offer/Bid</p>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex">
                  <p className="navWallet-item">History</p>
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex">
                  <p className="navWallet-item">My NFTs</p>
                </div>
              </li>

              <li>
                <div
                  onClick={() => walletDisConnect()}
                  className="dropdown-item d-flex"
                >
                  <p className="navWallet-item"> Disconnect</p>
                </div>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <button
          onClick={walletClickHandler}
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
        >
          <small>
            <i className="fas fa-wallet me-1"></i> Connect Wallet
          </small>
        </button>
      )}
    </div>
  );
};

// function beatifyAddress(address : string) {
function beatifyAddress(address: string | undefined) {
  return address ? `${address.slice(0, 5)}...${address.slice(-5)}` : "";
}
export default memo(Wallet);

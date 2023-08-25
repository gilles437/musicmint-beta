import { memo, useEffect, useState } from "react";
import Identicon from "@polkadot/react-identicon";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { BaseWallet, Account } from "@polkadot-onboard/core";

const Wallet = ({ wallet }: { wallet: BaseWallet }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
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
      } catch (error) {
        // handle error
      } finally {
        setIsBusy(false);
      }
    }
  };

  return (
    <div>
      {accounts.length ? (
        <>
          <Identicon value={accounts[0].address} size={32} theme="polkadot" />
          {beatifyAddress(accounts[0].address)}
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
function beatifyAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
export default memo(Wallet);

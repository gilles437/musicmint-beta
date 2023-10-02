import { memo, useEffect, useState } from "react";
import { BaseWallet, Account } from "@polkadot-onboard/core";
import DropDown from './DropDown';
import { formatAccount } from '@/utils/account';
interface ParentProps {
  accountArray: Account[];
  current: string | null;
}

const Wallet = ({ wallet }: { wallet: BaseWallet }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const props: ParentProps={
    accountArray: accounts,
    current: currentAccount,
  }
  const walletClickHandler = async (event: React.MouseEvent) => {
    console.log(`wallet clicked!`);
    if (!isBusy) {
      try {
        setIsBusy(true);
        await wallet.connect();
        let accounts = await wallet.getAccounts();
        accounts.map(account =>{
          account.address = formatAccount(account.address)
        })
        setAccounts(accounts);
        let data = { key: accounts };
        localStorage.setItem('accounts', JSON.stringify(data));
        setCurrentAccount(accounts[0].address);
        localStorage.setItem('currentAccount', JSON.stringify(accounts[0].address));
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
          <DropDown {...props} setAccounts={setAccounts}/>
      ) : (
        <button
          onClick={walletClickHandler}
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
        >
          <small>
            <span className="me-1">
              {" "}
              <img
                src="/assets/image/icon/ALLFEAT_logo+points.png"
                style={{ height: "20px", width: "20px" }}
              ></img>
            </span>{" "}
            Connect Wallet
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

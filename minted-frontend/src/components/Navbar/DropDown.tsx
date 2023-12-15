import { useEffect, useState } from 'react';
import { Account } from '@polkadot-onboard/core';
import Identicon from '@polkadot/react-identicon';
import Link from 'next/link';
import { beatifyAddress } from '@/utils/account';
import { useWallets } from '@/contexts/Wallets';

const DropDown = () => {
  const { accounts, walletAddress, setActiveAccount, disconnectWallet } =
    useWallets();

  return (
    <div>
      <>
        <div className="btn-group">
          <div
            className="dropdown-toggle mousePointer"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Identicon
              value={walletAddress}
              size={32}
              theme="polkadot"
              className="pe-1"
            />
            {beatifyAddress(walletAddress)}
          </div>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end mousePointer wallet-connect">
            {accounts.map((account: Account) => (
              <li key={account.address} onClick={() => setActiveAccount(account)}>
                <div className="dropdown-item d-flex">
                  <Identicon
                    value={account.address}
                    size={32}
                    theme="polkadot"
                    className="pe-1"
                  />
                  <p className="ps-1">{beatifyAddress(account.address)}</p>
                </div>
              </li>
            ))}
            <li>
              <div className="dropdown-item d-flex">
                <Link href="/profile/update" className="d-flex">
                  <img
                    src="/assets/image/icon/my-account.svg"
                    alt="my-account"
                  />
                  <p className="ps-1">My Account</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="dropdown-item">
                <Link href="/album/owned" className="d-flex">
                  <img src="/assets/image/icon/my-nft.svg" alt="my-nft" />
                  <p className="ps-1">My Albums</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="dropdown-item">
                <Link href="/admins" className="d-flex">
                  <img
                    src="/assets/image/icon/my-account.svg"
                    alt="my-account"
                  />
                  <p className="ps-1">Admin Dashboard</p>
                </Link>
              </div>
            </li>
            <li>
              <div className="dropdown-item d-flex">
                <img src="/assets/image/icon/my-offer.svg" alt="my-offer" />
                <p className="ps-1">My Offer/Bid</p>
              </div>
            </li>
            <li>
              <div className="dropdown-item d-flex">
                <img src="/assets/image/icon/history.svg" alt="history" />
                <p className="ps-1">History</p>
              </div>
            </li>
            <li>
              <div className="dropdown-item d-flex">
                <img src="/assets/image/icon/my-nft.svg" alt="my-nft" />
                <Link href="/nfts/owned">
                  <p className="ps-1">My NFTs</p>
                </Link>
              </div>
            </li>

            <li>
              <div
                onClick={() => disconnectWallet()}
                className="dropdown-item d-flex"
              >
                <img src="/assets/image/icon/disconnect.svg" alt="disconnect" />
                <p className="ps-1"> Disconnect</p>
              </div>
            </li>
          </ul>
        </div>
      </>
    </div>
  );
};

export default DropDown;

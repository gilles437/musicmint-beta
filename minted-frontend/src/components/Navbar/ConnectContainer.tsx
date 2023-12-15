import { useCallback, useEffect, useState } from 'react';
import { useWallets } from '@/contexts/Wallets';
import { Account } from '@polkadot-onboard/core';
import { formatAccount } from '@/utils/account';
import { toast } from 'react-toastify';
import DropDown from './DropDown';

const ConnectContainer = () => {
  const { wallet, accounts, connectWallet } = useWallets();

  const Msg = ({}) => (
    <div>
      <img
        src="/assets/image/icon/ALLFEAT_logo+points.png"
        style={{ height: '25px', width: '25px' }}
      ></img>
      <a target="_blank" href="https://polkadot.js.org/extension/">
        No wallet found. Please press here to install Allfeat wallet.
      </a>
    </div>
  );
  const notify = () => toast(<Msg />);

  return (
    <div>
      {wallet ? (
        <div>
          {accounts.length ? (
            <DropDown />
          ) : (
            <button
              onClick={connectWallet}
              className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
            >
              <small>
                <span className="me-1">
                  <img
                    src="/assets/image/icon/ALLFEAT_logo+points.png"
                    style={{ height: '20px', width: '20px' }}
                  ></img>
                </span>
                Connect Wallet
              </small>
            </button>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={notify}
            className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          >
            <small>
              <span className="me-1">
                <img
                  src="/assets/image/icon/ALLFEAT_logo+points.png"
                  style={{ height: '20px', width: '20px' }}
                ></img>
              </span>
              Connect Wallet
            </small>
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectContainer;

import { useState } from 'react';
import {
  web3Accounts,
  web3Enable
} from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import Identicon from '@polkadot/react-identicon';

// type TExtensionState = {
//   data?: {
//     accounts: InjectedAccountWithMeta[],
//     defaultAccount: InjectedAccountWithMeta,
//   }
//   loading: boolean
//   error: null | Error
// }

// const initialExtensionState :TExtensionState = {
const initialExtensionState = {
  data: undefined,
  loading: false,
  error: null
};

export const Connect = () => {
  const [state, setState] = useState(initialExtensionState);

  const handleConnect = () => {
    setState({ ...initialExtensionState, loading: true });

    web3Enable('polkadot-extension-dapp-example')
      .then((injectedExtensions) => {
        if (!injectedExtensions.length) {
          return Promise.reject(new Error('NO_INJECTED_EXTENSIONS'));
        }

        return web3Accounts();
      })
      .then((accounts) => {
        if (!accounts.length) {
          return Promise.reject(new Error('NO_ACCOUNTS'));
        }

        setState({
          error: null,
          loading: false,
          data: {
            accounts: accounts,
            defaultAccount: accounts[0],
          }
        });
      })
      .catch((error) => {
        console.error('Error with connect', error);
        setState({ error, loading: false, data: undefined });
      });
  };

  if (state.error) {
    return (
      <span className="text-red-500 font-bold tracking-tight">
        Error with connect: {state.error.message}
      </span>
    );
  }

  return state.data
    ? <> <Identicon
      value={state.data.defaultAccount.address}
      size="32"
      theme='polkadot'
    />{beatifyAddress(state.data.defaultAccount.address)}</>
    :
    <button disabled={state.loading} onClick={handleConnect} className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
      <small> <i className="fas fa-wallet me-1"></i>  {state.loading ? 'Connecting...' : 'Connect Wallet'} </small>
    </button>;

};

// function beatifyAddress(address : string) {
function beatifyAddress(address) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
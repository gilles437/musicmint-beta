import { useMemo } from 'react';

import { useApi } from '@/contexts/Polkadot';
import { useWallets } from '@/contexts/Wallets';

import { useGasLimit } from './useGasLimit';
import { createAlbumContract } from './utils';

export const useAlbumContract = (address?: string | null) => {
  const { api } = useApi();
  const gasLimit = useGasLimit(api);
  const { wallet, walletAddress } = useWallets();

  const contract = useMemo(() => {
    if (api && address) {
      return createAlbumContract(api, address);
    }
    return null;
  }, [api, address]);

  const params = useMemo(() => {
    if (!api) {
      console.error('API is not ready');
      return null;
    }
    if (!wallet || !walletAddress) {
      console.error('Please connect your wallet!');
      return null;
    }

    console.info('API Ready!!!');
    return {
      api,
      wallet,
      account: walletAddress,
      options: { value: 0, storageDepositLimit: null, gasLimit },
      signer: { signer: wallet.signer },
    };
  }, [api, wallet, walletAddress, gasLimit]);

  return {
    contract,
    params,
  };
};

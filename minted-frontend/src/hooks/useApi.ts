import { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

export const wsProvider = new WsProvider('wss://rpc-test-3.allfeat.io');

export const useApi = () => {
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect(() => {
    (async () => {
      const _api = await ApiPromise.create({ provider: wsProvider });      
      setApi(_api);

      const { chainSS58, chainDecimals, chainTokens } = _api.registry;
      localStorage.setItem('chainSS58', JSON.stringify(chainSS58));
    })();
  }, []);

  return api;
};

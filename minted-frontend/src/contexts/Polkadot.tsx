import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

interface IPolkadotContext {
  api: ApiPromise | null;
}

export const wsProvider = new WsProvider('wss://rpc-test-3.allfeat.io');

const PolkadotContext = createContext({} as IPolkadotContext);
export const useApi = () => useContext<IPolkadotContext>(PolkadotContext);

const PolkadotProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect(() => {
    (async () => {
      const _api = await ApiPromise.create({ provider: wsProvider });    
      console.log(`API Created`, _api);
      setApi(_api);

      const { chainSS58 } = _api.registry;
      localStorage.setItem('chainSS58', JSON.stringify(chainSS58));
    })();
  }, []);

  return (
    <PolkadotContext.Provider value={{ api }}>
      {children}
    </PolkadotContext.Provider>
  );
};

export default PolkadotProvider;

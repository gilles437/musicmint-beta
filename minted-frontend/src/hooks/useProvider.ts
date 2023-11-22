import { useMemo } from "react";
import { WsProvider } from "@polkadot/api";

export const useProvider = () => {
  return useMemo(() => {
    // const wsProvider = new WsProvider("wss://rpc-test.allfeat.io");
    const wsProvider = new WsProvider("ws://127.0.0.1:9944");

    return wsProvider
  }, []);
};

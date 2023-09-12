import Connector from "@utils/api2";

export async function connectChain(data: string) {
  let endpoint: string = "wss://rpc-test.allfeat.io";
  let option: string = "allfeat";

  const { getInstance: Api } = Connector;

  await Api().connect(endpoint, option);

  Api().on("connect", async (api: any) => {
    const { chainSS58, chainDecimals, chainTokens } = api.registry;
    const { genesisHash } = api;
    console.log("[API] Connect to <3", endpoint, {
      chainSS58,
      chainDecimals,
      chainTokens,
      genesisHash,
    });
    localStorage.setItem("chainSS58", JSON.stringify(chainSS58));
    return true;
  });
  Api().on("error", async (error: Error) => {
    console.warn("[API] error", error);
    return false;
  });
}


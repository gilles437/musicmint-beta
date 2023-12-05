export enum ChainId {
  MAINNET = 1,
  AllFEATTestNET = 42,
}

export const DEFAULT_CHAIN = ChainId.AllFEATTestNET;

export const ADMIN_SUBGRAPH_URLS: { [chainId: number]: string } = {
  [ChainId.AllFEATTestNET]: "https://subsquid.mintedwaves.com/graphql",
};

export const ALBUM_SUBGRAPH_URLS: { [chainId: number]: string } = {
  [ChainId.AllFEATTestNET]: "http://192.64.115.5:5556/graphql",
};

export const ALLFEAT_CONTRACT = "5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG";

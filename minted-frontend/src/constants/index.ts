export enum ChainId {
  MAINNET = 1,
  AllFEATTestNET = 42,
}

export const DEFAULT_CHAIN = ChainId.AllFEATTestNET;

export const ADMIN_SUBGRAPH_URLS: { [chainId: number]: string } = {
  [ChainId.AllFEATTestNET]: process.env.NEXT_PUBLIC_SUBSQUID_ADMIN_URL as string,
};

export const ALBUM_SUBGRAPH_URLS: { [chainId: number]: string } = {
  [ChainId.AllFEATTestNET]: process.env.NEXT_PUBLIC_SUBSQUID_ALBUM_URL as string,
};

export const ALLFEAT_CONTRACT = "5D5G8y4Gusc89E2XjetuwuNAN5GdhnQKUByQJ9NxkCdFwwBG";

export enum ChainId {
  MAINNET = 1,
  AllFEATTestNET = 42,
}

export const DEFAULT_CHAIN = ChainId.AllFEATTestNET;

export const MARKETPLACE_SUBGRAPH_URLS: { [chainId: number]: string } = {
  [ChainId.AllFEATTestNET]: "http://localhost:4350/graphql",
};

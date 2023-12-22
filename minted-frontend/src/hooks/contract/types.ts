export interface ContractEventsType {
  dispatchInfo: {};
  events: {
    event: { data: any[] };
  }[];
  status: {};
  txHash: string;
  txIndex: number;
  blockNumber: string;
  contractEvents: [
    {
      args: string[];
      docs: [];
      identifier: string;
      index: number;
    }
  ];
}

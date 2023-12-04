import { request } from "graphql-request";

import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS } from "@/constants";
import { QUERY_GET_SUPER_ADMIN_TRANSFERS } from "@/lib/subgraph/erc721Queries";
import { SuperAdmin } from "./types";

interface FetchType {
  transfers: SuperAdmin[];
}

export const fetchSuperAdminList = async (): Promise<SuperAdmin[]> => {
  const result: FetchType = await request(
    MARKETPLACE_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_SUPER_ADMIN_TRANSFERS()
  );
  return result.transfers.map((data: SuperAdmin) => {
    const date = data.timestamp.split("T");
    const time = date[1].split(".");
    return {
      to: data.to,
      timestamp: date[0] + " " + time[0],
    }
  });
}

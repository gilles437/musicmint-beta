import { request } from "graphql-request";

import { DEFAULT_CHAIN, ADMIN_SUBGRAPH_URLS } from "@/constants";
import { QUERY_GET_ADMIN_TRANSFERS } from "@/lib/subgraph/queries";
import { Artist } from "./types";

interface FetchType {
  transfers: Artist[];
}

export const fetchArtistList = async (): Promise<Artist[]> => {
  const result: FetchType = await request(
    ADMIN_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ADMIN_TRANSFERS()
  );
  return result?.transfers || [];
}

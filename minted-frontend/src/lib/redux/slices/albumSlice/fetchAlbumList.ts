import { request } from "graphql-request";

import { DEFAULT_CHAIN, ALBUM_SUBGRAPH_URLS } from "@/constants";
import { QUERY_GET_ALBUM_TRANSFERS } from "@/lib/subgraph/erc721Queries";
import { Album } from "./types";

interface FetchType {
  collections: Album[];
}

export const fetchAlbumList = async (owner: string): Promise<Album[]> => {
  const result: FetchType = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALBUM_TRANSFERS(owner),
  );
  return result.collections.map((data: Album) => {
    const date = data.timestamp.split("T");
    const time = date[1].split(".");
    return {
      ...data,
      title: '',
      description: '',
      image: '',
      timestamp: date[0] + " " + time[0],
    } as Album;
  });
}

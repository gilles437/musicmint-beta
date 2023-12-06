import { request } from 'graphql-request';

import { DEFAULT_CHAIN, ALBUM_SUBGRAPH_URLS } from '@/constants';
import {
  QUERY_GET_ALBUM_TRANSFERS,
  QUERY_GET_ALL_ALBUMS,
  QUERY_GET_ALBUM_SONGS,
} from '@/lib/subgraph/erc721Queries';
import { Album, Song } from './types';

interface FetchType<T> {
  collections: T[];
}

export const fetchAllAlbumList = async (): Promise<Album[]> => {
  const result: FetchType<Album> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALL_ALBUMS()
  );
  return result.collections;
};

export const fetchOwnedAlbumList = async (owner: string): Promise<Album[]> => {
  const result: FetchType<Album> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALBUM_TRANSFERS(owner)
  );
  return result.collections;
};

export const fetchAlbumSongList = async (albumId: string): Promise<Song[]> => {
  const result: FetchType<Song> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALBUM_SONGS(albumId)
  );
  return result.collections;
};

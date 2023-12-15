import { request } from 'graphql-request';

import { DEFAULT_CHAIN, ALBUM_SUBGRAPH_URLS } from '@/constants';
import {
  QUERY_GET_ALBUMS,
  QUERY_GET_MINTED_ALBUMS,
  QUERY_GET_ALL_ALBUMS,
  QUERY_GET_ALBUM_SONGS,
  QUERY_GET_ALBUM_BY_ID,
  QUERY_GET_SONG_BY_ID,
  QUERY_GET_MINTED_SONG,
} from '@/lib/subgraph/erc721Queries';
import { Album, Song } from './types';

interface FetchType<T> {
  collections: T[];
}

interface MintFetchType<T> {
  mintItems: T[];
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
    QUERY_GET_ALBUMS(owner)
  );
  return result.collections;
};

export const fetchMintedAlbumList = async (owner: string): Promise<Album[]> => {
  const result: MintFetchType<Album> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_MINTED_ALBUMS(owner)
  );
  return result.mintItems;
};

export const fetchMintedSongList = async (owner: string): Promise<Song[]> => {
  const result: MintFetchType<Song> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_MINTED_SONG(owner)
  );
  return result.mintItems;
};

export const fetchAlbumById = async (contract: string, albumId: number): Promise<Album | null> => {
  const result: FetchType<Album> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALBUM_BY_ID(contract, albumId)
  );
  if (result.collections?.length) {
    return result.collections[0];
  }
  return null;
};

export const fetchAlbumSongList = async (albumId: number): Promise<Song[]> => {
  const result: FetchType<Song> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_ALBUM_SONGS(albumId)
  );
  return result.collections;
};

export const fetchSongById = async (
  contract: string,
  albumId: number,
  songId: number
): Promise<Song | null> => {
  const result: FetchType<Song> = await request(
    ALBUM_SUBGRAPH_URLS[DEFAULT_CHAIN],
    QUERY_GET_SONG_BY_ID(contract, albumId, songId)
  );
  if (result.collections?.length) {
    return result.collections[0];
  }
  return null;
};

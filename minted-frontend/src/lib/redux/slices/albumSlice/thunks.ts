/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import {
  fetchOwnedAlbumList,
  fetchMintedAlbumList,
  fetchAllAlbumList,
  fetchAlbumSongList,
  fetchAlbumById,
  fetchSongById,
  fetchMintedSongList,
} from './fetchAlbumList';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllAlbumsAsync = createAppAsyncThunk(
  'album/fetchAllAlbumsAsync', 
  async () => {
    return await fetchAllAlbumList();
  }
);

export const fetchOwnedAlbumListAsync = createAppAsyncThunk(
  'album/fetchOwnedAlbumListAsync',
  async (owner: string) => {
    return await fetchOwnedAlbumList(owner);
  }
);

export const fetchMintedAlbumListAsync = createAppAsyncThunk(
  'album/fetchMintedAlbumListAsync',
  async (owner: string) => {
    return await fetchMintedAlbumList(owner);
  }
);

export const fetchMintedSongListAsync = createAppAsyncThunk(
  'album/fetchMintedSongListAsync',
  async (owner: string) => {
    return await fetchMintedSongList(owner);
  }
);

export const fetchAlbumByIdAsync = createAppAsyncThunk(
  'album/fetchAlbumByIdAsync',
  async ({ contract, albumId }: { contract: string; albumId: number }) => {
    return await fetchAlbumById(contract, albumId);
  }
);

export const fetchAlbumSongListAsync = createAppAsyncThunk(
  'album/fetchAlbumSongListAsync',
  async (albumId: number) => {
    return await fetchAlbumSongList(albumId);
  }
);

export const fetchSongByIdAsync = createAppAsyncThunk(
  'album/fetchSongByIdAsync',
  async (args: { contract: string; albumId: number; songId: number }) => {
    const { contract, albumId, songId } = args;
    return await fetchSongById(contract, albumId, songId);
  }
);

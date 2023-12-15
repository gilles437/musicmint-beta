/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import {
  fetchOwnedAlbumListAsync,
  fetchAllAlbumsAsync,
  fetchAlbumByIdAsync,
  fetchAlbumSongListAsync,
  fetchSongByIdAsync,
  fetchMintedAlbumListAsync,
  fetchMintedSongListAsync,
} from './thunks';
import { Album, AlbumMetadata, Song, SongMetadata } from './types';

/* Types */
export interface AlbumState {
  status: 'idle' | 'loading' | 'failed';
  loading: boolean;
  albums: Album[];
  albumMetadata: { [key: string]: AlbumMetadata };
  songs: Song[];
  songMetadata: { [key: string]: SongMetadata };
  mintedAlbums: Album[];
}

const initialState: AlbumState = {
  status: 'idle',
  loading: false,
  albums: [],
  albumMetadata: {},
  songs: [],
  songMetadata: {},
  mintedAlbums: [],
};

export const albumSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? 'loading' : 'idle';
    },
    setLoadingArtists: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    setAlbumMetadata: (
      state,
      action: PayloadAction<{ id: string; metadata: AlbumMetadata }>
    ) => {
      if (action.payload.id) {
        state.albumMetadata[action.payload.id] = action.payload.metadata;
      }
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    setSongMetadata: (
      state,
      action: PayloadAction<{ id: string; metadata: SongMetadata }>
    ) => {
      if (action.payload.id) {
        state.songMetadata[action.payload.id] = action.payload.metadata;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnedAlbumListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOwnedAlbumListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.albums = action.payload || [];
      })
      .addCase(fetchAllAlbumsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAlbumsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.albums = action.payload || [];
      })
      .addCase(fetchAlbumByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.albums.push(action.payload);
        }
      })
      .addCase(fetchMintedAlbumListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMintedAlbumListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mintedAlbums = action.payload;
      })
      .addCase(fetchMintedSongListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMintedSongListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.songs = action.payload || [];
      })
      .addCase(fetchAlbumSongListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumSongListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.songs = action.payload || [];
      })
      .addCase(fetchSongByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          const song = action.payload;
          const index = state.songs.findIndex(
            (s) =>
              s.contract === song.contract &&
              s.albumid === song.albumid &&
              s.songid === song.songid
          );
          if (index >= 0) {
            state.songs.splice(index, 1, song);
          } else {
            state.songs.push(song);
          }
        }
      });
  },
});

export const {
  setLoadingStatus: setAlbumLoadingStatus,
  setAlbums,
  setAlbumMetadata,
  setSongs,
  setSongMetadata,
} = albumSlice.actions;

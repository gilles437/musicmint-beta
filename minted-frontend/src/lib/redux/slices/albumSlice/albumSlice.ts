/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { fetchAlbumListAsync } from './thunks'
import { Album } from './types';

/* Types */
export interface AlbumState {
  status: 'idle' | 'loading' | 'failed'
  loadingArtists: boolean;
  albums: Album[];
  albumMetadata: { [key: string]: AlbumMetadata };
}

const initialState: AlbumState = {
  status: 'idle',
  loadingArtists: false,
  albums: [],
  albumMetadata: {},
}

export const albumSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? 'loading' : 'idle'
    },
    setLoadingArtists: (state, action: PayloadAction<boolean>) => {
      state.loadingArtists = action.payload;
    },
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    setAlbumMetadata: (state, action: PayloadAction<AlbumMetadata>) => {
      if (action.payload.id) {
        state.albumMetadata[action.payload.id] = action.payload;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumListAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAlbumListAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.albums = action.payload
      })
  },
})

export const {
  setLoadingStatus,
  setAlbums,
  setAlbumMetadata,
} = albumSlice.actions;
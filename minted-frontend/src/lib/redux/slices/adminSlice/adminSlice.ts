/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/* Instruments */
import { fetchSuperAdminListAsync, fetchArtistListAsync } from './thunks';
import { Artist, SuperAdmin } from './types';

/* Types */
export interface AdminState {
  status: 'idle' | 'loading' | 'failed';
  loadingAdmins: boolean;
  loadingArtists: boolean;
  superAdmins: SuperAdmin[];
  artists: Artist[];
}

const initialState: AdminState = {
  status: 'idle',
  loadingAdmins: false,
  loadingArtists: false,
  superAdmins: [],
  artists: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? 'loading' : 'idle';
    },
    setLoadingArtists: (state, action: PayloadAction<boolean>) => {
      state.loadingArtists = action.payload;
    },
    setSuperAdmins: (state, action: PayloadAction<SuperAdmin[]>) => {
      state.superAdmins = action.payload;
    },
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperAdminListAsync.pending, (state) => {
        state.loadingAdmins = true;
      })
      .addCase(fetchSuperAdminListAsync.fulfilled, (state, action) => {
        state.loadingAdmins = false;
        state.superAdmins = action.payload;
      })
      .addCase(fetchArtistListAsync.pending, (state) => {
        state.loadingArtists = true;
      })
      .addCase(fetchArtistListAsync.fulfilled, (state, action) => {
        state.loadingArtists = false;
        state.artists = action.payload;
      });
  },
});

export const { setLoadingStatus, setSuperAdmins, setArtists } = adminSlice.actions;

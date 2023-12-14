/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAlbums = (state: ReduxState) => state.album.albums;

export const selectMintedAlbums = (state: ReduxState) => state.album.mintedAlbums;

export const selectAlbumMetadata = (state: ReduxState) => state.album.albumMetadata;

export const selectSongs = (state: ReduxState) => state.album.songs;

export const selectSongMetadata = (state: ReduxState) => state.album.songMetadata;


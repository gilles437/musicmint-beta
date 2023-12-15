/* Instruments */
import { adminSlice, albumSlice } from './slices'

export const reducer = {
  admin: adminSlice.reducer,
  album: albumSlice.reducer,
}

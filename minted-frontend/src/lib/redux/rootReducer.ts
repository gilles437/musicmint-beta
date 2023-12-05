/* Instruments */
import { counterSlice, adminSlice, albumSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  admin: adminSlice.reducer,
  album: albumSlice.reducer,
}

/* Instruments */
import { counterSlice, adminSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  admin: adminSlice.reducer,
}

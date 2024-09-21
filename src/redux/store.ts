import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    counter: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
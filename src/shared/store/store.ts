import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

const reducer = {
  auth: authReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
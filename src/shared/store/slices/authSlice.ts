import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

import AuthService from '../../api'

const token = localStorage.getItem('idToken')

export const signUp = createAsyncThunk<
  { idToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await AuthService.signUp(email, password)
      return res
    } catch (error: any) {
      let message: string
      if (error.message === 'EMAIL_EXISTS') {
        message = 'Пользователь с таким email уже существует'
      } else {
        message = 'Случилось что-то странное, попробуйте ещё раз'
      }
      return thunkAPI.rejectWithValue({ message: message })
    }
  }
)

export const changeData = createAsyncThunk<
  { idToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/changeData',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await AuthService.changeData(email, password)
      return res
    } catch (error: any) {
      console.log(error.message)
      let message: string
      switch (error.message) {
        case 'EMAIL_EXISTS':
          message = 'Этот email уже занят'
          break
        case 'INVALID_ID_TOKEN':
        case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
          message =
            'Срок действия вашей сессии истек. Пожалуйста, войдите в аккаунт заново'
          break
        default:
          message = 'Случилось что-то странное, попробуйте ещё раз'
          break
      }
      return thunkAPI.rejectWithValue({ message: message })
    }
  }
)

export const signIn = createAsyncThunk<
  { idToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.signIn(email, password)
      return data
    } catch (error: any) {
      let message: string
      console.log(error.message)
      switch (error.message) {
        case 'EMAIL_NOT_FOUND':
          message = 'Пользователь с таким email не найден'
          break
        case 'INVALID_PASSWORD':
          message = 'Неверный пароль'
          break
        case 'USER_DISABLED':
          message = 'Пользователь заблокирован'
          break
        default:
          message = 'Случилось что-то странное, попробуйте ещё раз'
          break
      }
      return thunkAPI.rejectWithValue({ message: message })
    }
  }
)

export const logout = createAction('auth/logout')

const initialState: {
  isLoggedIn: boolean
  idToken: string | null
  error: string | null
} = token
  ? { isLoggedIn: true, idToken: token, error: null }
  : { isLoggedIn: false, idToken: null, error: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.idToken = payload.idToken
        state.error = null
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        state.idToken = null
        if (payload) state.error = payload.message
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.idToken = payload.idToken
        state.error = null
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        state.idToken = null
        if (payload) state.error = payload.message
      })
      .addCase(changeData.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.idToken = payload.idToken
        state.error = null
      })
      .addCase(changeData.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        if (payload) state.error = payload.message
      })
      .addCase(logout, (state) => {
        AuthService.logout()
        state.isLoggedIn = false
        state.idToken = null
        state.error = null
      })
  },
})

const { reducer } = authSlice
export default reducer

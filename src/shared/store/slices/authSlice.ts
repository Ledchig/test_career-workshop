import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

import AuthService from '../../api'

export const signUp = createAsyncThunk<
  { idToken: string },
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
      return { idToken: res }
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
  { idToken: string },
  { idToken: string; email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/changeData',
  async (
    {
      idToken,
      email,
      password,
    }: { idToken: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      let newToken = idToken
      if (email) {
        newToken = await AuthService.changeEmail(idToken, email)
      }
      if (password) {
        const token = newToken || idToken 
        newToken = await AuthService.changePassword(token, password)
      }
      return { idToken: newToken }
    } catch (error: any) {
      let message = 'Случилось что-то странное, попробуйте ещё раз'
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
          break
      }
      return thunkAPI.rejectWithValue({ message })
    }
  }
)

export const signIn = createAsyncThunk<
  { idToken: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const idToken = await AuthService.signIn(email, password)
      return { idToken }
    } catch (error: any) {
      let message = 'Случилось что-то странное, попробуйте ещё раз'
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
          break
      }
      return thunkAPI.rejectWithValue({ message })
    }
  }
)

export const logout = createAction('auth/logout')

const initialState: {
  isLoggedIn: boolean
  idToken: string | null
  error: string | null
} = { isLoggedIn: false, idToken: null, error: null }

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
        if (payload) state.error = payload.message
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true
        state.idToken = payload.idToken
        state.error = null
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isLoggedIn = false
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
        state.idToken = null
        state.isLoggedIn = false
        state.error = null
      })
  },
})

const { reducer } = authSlice
export default reducer

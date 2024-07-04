import axios from 'axios'
import { apiKey } from '../../firebase'

const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'

const signUp = async (email: string, password: string) => {
  try {
    const {
      data: { idToken, refreshToken },
    } = await axios.post(`${API_URL}signUp?key=${apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('refreshToken', refreshToken)

    return idToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}signInWithPassword?key=${apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })

    localStorage.setItem('idToken', res.data.idToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    return res.data as { idToken: string; refreshToken: string }
  } catch (err: any) {
    throw err.response.data.error
  }
}

const changeEmail = async (email: string) => {
  try {
    const token = localStorage.getItem('idToken')
    const resSetEmail = await axios.post(`${API_URL}update?key=${apiKey}`, {
      idToken: token,
      email: email,
      returnSecureToken: true,
    })
    const newToken = resSetEmail.data.idToken ?? token
    localStorage.setItem('idToken', newToken)
    return newToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const changePassword = async (password: string) => {
  try {
    const token = localStorage.getItem('idToken')
    const resSetPass = await axios.post(`${API_URL}update?key=${apiKey}`, {
      idToken: token,
      password: password,
      returnSecureToken: true,
    })
    const newToken = resSetPass.data.idToken ?? token
    localStorage.setItem('idToken', newToken)
    return newToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const logout = () => {
  localStorage.removeItem('idToken')
  localStorage.removeItem('refreshToken')
}

const AuthService = {
  signUp,
  signIn,
  logout,
  changeEmail,
  changePassword,
}

export default AuthService

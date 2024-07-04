import axios from 'axios'
import { apiKey } from '../../firebase'

const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'

const signUp = async (email: string, password: string) => {
  try {
    const {
      data: { idToken },
    } = await axios.post(`${API_URL}signUp?key=${apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })

    return idToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const {
      data: { idToken },
    } = await axios.post(`${API_URL}signInWithPassword?key=${apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })

    return idToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const changeEmail = async (idToken: string, email: string) => {
  try {
    const resSetEmail = await axios.post(`${API_URL}update?key=${apiKey}`, {
      idToken: idToken,
      email: email,
      returnSecureToken: true,
    })
    return resSetEmail.data.idToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const changePassword = async (idToken: string, password: string) => {
  try {
    const resSetPass = await axios.post(`${API_URL}update?key=${apiKey}`, {
      idToken: idToken,
      password: password,
      returnSecureToken: true,
    })
    return resSetPass.data.idToken
  } catch (err: any) {
    throw err.response.data.error
  }
}

const AuthService = {
  signUp,
  signIn,
  changeEmail,
  changePassword,
}

export default AuthService

import axios from 'axios'

const signUp = async (email: string, password: string) => {
  try {
    await axios.post(`${process.env.API_URL}signUp?key=${process.env.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
  } catch (err: any) {
    throw err.response.data.error
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const {
      data: { idToken },
    } = await axios.post(`${process.env.API_URL}signInWithPassword?key=${process.env.API_KEY}`, {
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
    const resSetEmail = await axios.post(`${process.env.API_URL}update?key=${process.env.API_KEY}`, {
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
    const resSetPass = await axios.post(`${process.env.API_URL}update?key=${process.env.API_KEY}`, {
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

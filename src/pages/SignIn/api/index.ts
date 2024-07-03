import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    const user = response.user
    return user
  } catch (err: any) {
    const errorCode = err.code
    const errorMessage = err.message
    return { errorCode, errorMessage }
  }
}

export default signIn

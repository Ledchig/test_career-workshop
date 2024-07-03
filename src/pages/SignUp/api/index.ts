import { auth } from '../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const signUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        return user
    })
    .catch((error) => {
        throw error
    })
}

export default signUp

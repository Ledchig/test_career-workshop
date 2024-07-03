import { redirect } from 'react-router-dom'
import { auth } from '../../../firebase'
import { updateEmail, updatePassword } from 'firebase/auth'

const changeData = async (email: string, password: string) => {
  try {
    const currentUser = auth.currentUser
    if (currentUser) {
        const resSetEmail = await updateEmail(currentUser, email)
        const resSetPass = await updatePassword(currentUser, password)
    } else {
        redirect('')
    }
  } catch (err: any) {
    const errorCode = err.code
    const errorMessage = err.message
    return { errorCode, errorMessage }
  }
}

export default changeData


// import { getAuth, updateEmail } from "firebase/auth";
// const auth = getAuth();
// updateEmail(auth.currentUser, "user@example.com").then(() => {
//   // Email updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });

// import { getAuth, updatePassword } from "firebase/auth";

// const auth = getAuth();

// const user = auth.currentUser;
// const newPassword = getASecureRandomPassword();

// updatePassword(user, newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });
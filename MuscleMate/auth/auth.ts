import config from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendPasswordResetEmail,
  // sendEmailVerification,
  // updatePassword,
  // signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(config.auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(config.auth, email, password);
};

export const doSignOut = () => {
  return config.auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(config.auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(config.auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };

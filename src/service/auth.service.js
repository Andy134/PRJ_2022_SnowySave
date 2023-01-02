import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authService = {
    logInWithEmailAndPassword,
    sendPasswordReset,
    logout
  }
  
  // Balance
  async function logInWithEmailAndPassword(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
    console.error(err);
    alert(err.message);
    }
  }

  async function sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  function logout(){
    signOut(auth);
  };
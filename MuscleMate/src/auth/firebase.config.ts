import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyC7OLvQlP18JRi_FRV4WqmSL5hM38hbX80",
  authDomain: "muscleman-bcf32.firebaseapp.com",
  projectId: "muscleman-bcf32",
  storageBucket: "muscleman-bcf32.appspot.com",
  messagingSenderId: "1002258857191",
  appId: "1:1002258857191:web:66acb2d132e7bc62c73642",
  measurementId: "G-8JN24RXSSP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default {app, auth}
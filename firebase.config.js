import { initializeApp,} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getDatabase} from "firebase/database"  

const firebaseConfig = {
    apiKey: "AIzaSyD6ugxSBLxd_NkzYBF45VVetwApatbc0oQ",
    authDomain: "webrtcreact-1afc2.firebaseapp.com",
    databaseURL: "https://webrtcreact-1afc2-default-rtdb.firebaseio.com",
    projectId: "webrtcreact-1afc2",
    storageBucket: "webrtcreact-1afc2.appspot.com",
    messagingSenderId: "553014629421",
    appId: "1:553014629421:web:0220643fe28ab9ccf754a4",
    measurementId: "G-MN5HJBCTF5"
  };

  const app =initializeApp(firebaseConfig);
  export const db=getFirestore(app);
  export const auth= getAuth(app)

import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBTx4dwQNbsjbrmZLw_G_r4RMmx5KVPb1I",
  authDomain: "blinds-release4.firebaseapp.com",
  databaseURL: "https://blinds-release4-default-rtdb.firebaseio.com",
  projectId: "blinds-release4",
  storageBucket: "blinds-release4.appspot.com",
  messagingSenderId: "827043729896",
  appId: "1:827043729896:web:7a017ce35f17c057eed45d",
  measurementId: "G-N4V1S7RVLH",
};


export const app = firebase.initializeApp(firebaseConfig);
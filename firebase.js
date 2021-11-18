import * as firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAoF2XgfKxov4UKgvVSuo9wtL36PqjYH_g",
  authDomain: "mentality-33d20.firebaseapp.com",
  projectId: "mentality-33d20",
  storageBucket: "mentality-33d20.appspot.com",
  messagingSenderId: "451895372638",
  appId: "1:451895372638:web:fc5d8ae5ea21ed866a3dcf",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

export { db };

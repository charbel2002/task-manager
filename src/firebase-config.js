
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCTCTGA3D7iS8jzqxSczGwrW5tRV3NGa1M",
  authDomain: "react-auth0-a195b.firebaseapp.com",
  projectId: "react-auth0-a195b",
  storageBucket: "react-auth0-a195b.appspot.com",
  messagingSenderId: "130559150975",
  appId: "1:130559150975:web:90f0a8ec2bf5f32eefe84a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const db = getFirestore(app);
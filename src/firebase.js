import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD3gi8-vPjIm7QZktKRSoNjvFsAY4k-Wws",
  authDomain: "gre-oral-health.firebaseapp.com",
  projectId: "gre-oral-health",
  storageBucket: "gre-oral-health.appspot.com",
  messagingSenderId: "990714975164",
  appId: "1:990714975164:web:1f6be04feaaf3b191b51b9",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

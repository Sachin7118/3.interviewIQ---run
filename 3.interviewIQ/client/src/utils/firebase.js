import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyDybcTuPbvsTG5J_h6dL127NlkmaVIHf20",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "interviewiq-e9cc1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "interviewiq-e9cc1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "interviewiq-e9cc1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "833776666710",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:833776666710:web:880ee3f99f1df0ad3513f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export { auth, provider };
// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth }     from "firebase/auth";

const clientConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "your-firebase-project-id",
  // etc...
};

const app  = initializeApp(clientConfig);
export const auth = getAuth(app);

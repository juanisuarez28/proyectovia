import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// IMPORTANTE: las variables NEXT_PUBLIC_* se inyectan en tiempo de BUILD.
// Si faltan en Vercel (o se agregaron despues del ultimo deploy) llegan como
// undefined y cualquier lectura/escritura de Firestore falla en silencio.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const REQUIRED_KEYS = ["apiKey", "projectId", "appId"] as const;

export const missingFirebaseEnv = REQUIRED_KEYS
  .filter((key) => !firebaseConfig[key])
  .map((key) => `NEXT_PUBLIC_FIREBASE_${key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`);

export function assertFirebaseConfig() {
  if (missingFirebaseEnv.length > 0) {
    throw new Error(
      `Firebase no esta configurado. Faltan estas variables de entorno: ${missingFirebaseEnv.join(", ")}. ` +
        `Cargalas en Vercel (Settings > Environment Variables, entorno Production) y volve a desplegar.`
    );
  }
}

// Initialize Firebase (Singleton pattern to prevent re-initialization errors in Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

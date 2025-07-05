/** Libraries */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

/** Config */
import { firebaseConfig } from '../environment/environment';

/** Composable */

export function useFirebase() {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);
  return { app, db };
}
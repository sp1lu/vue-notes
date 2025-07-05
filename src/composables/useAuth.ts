/** Libraries */
import { onUnmounted, ref } from 'vue';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type AuthError, type Unsubscribe, type User } from 'firebase/auth';

/** Composables */
import { useFirebase } from './useFirebase';

/** Composable */
export function useAuth() {
    const { app } = useFirebase();
    const auth = getAuth(app);
    const user = ref<User | null>(null);

    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
    });

    const signInWithGoogle = async (): Promise<void> => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Utente loggato con Google:', user);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = (): void => {
        signOut(auth)
            .then(() => {
                console.log('Log out effettuato correttamente');
            })
            .catch((error: AuthError) => {
                console.log('Errore nell\'effettuare il logout', error);
            })
    }

    onUnmounted(() => {
        unsubscribe();
    });

    return { user, signInWithGoogle, logOut }
}
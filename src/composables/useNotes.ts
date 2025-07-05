/** Libraries */
import { addDoc, collection, doc, getDocs, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, setDoc, where, type Unsubscribe } from 'firebase/firestore';
import { useFirebase } from './useFirebase';

/** Models */
import type { Note } from '../models';

/** Converters */
import { noteConverter } from '../firebaseConverters';
import { ref } from 'vue';

/** Composable */
export function useNotes() {
    const { db } = useFirebase();

    const allNotes = ref<Note[]>([]);
    const notesUnsubscribe = ref<Unsubscribe | undefined>(undefined);

    const getAllNotes = async (): Promise<Note[]> => {
        const notes: Note[] = [];

        const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'notes').withConverter(noteConverter));
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            notes.push(doc.data() as Note);
        });

        return notes;
    }

    const subscribeToAllNotes = () => {
        const q = query(collection(db, 'notes').withConverter(noteConverter));
        notesUnsubscribe.value = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
            const result: Note[] = [];

            querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
                result.push(doc.data() as Note);
            });

            allNotes.value = [...result];
        });
    }

    const addNote = async (note: Note) => {
        const docRef = await addDoc(collection(db, 'notes').withConverter(noteConverter), note);
    }

    const unsubscribeFromAllNotes = () => {
        if (notesUnsubscribe.value) {
            notesUnsubscribe.value();
            notesUnsubscribe.value = undefined;
        }
    }

    return { allNotes, getAllNotes, subscribeToAllNotes, unsubscribeFromAllNotes, addNote }
}
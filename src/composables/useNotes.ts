/** Libraries */
import { collection, getDocs, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { useFirebase } from './useFirebase';

/** Models */
import type { Note } from '../models';

/** Converters */
import { noteConverter } from '../firebaseConverters';

/** Composable */
export function useNotes() {
    const { db } = useFirebase();

    const getAllNotes = async (): Promise<Note[]> => {
        const notes: Note[] = [];

        const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'notes').withConverter(noteConverter));
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            notes.push(doc.data() as Note);
        });

        return notes;
    }

    return { getAllNotes }
}
/** Libraries */
import { addDoc, collection, doc, DocumentReference, getDocs, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, setDoc, updateDoc, where, type Unsubscribe } from 'firebase/firestore';
import { useFirebase } from './useFirebase';

/** Models */
import type { Note, Position } from '../models';

/** Converters */
import { noteConverter } from '../firebaseConverters';
import { ref, type Ref } from 'vue';

/** Composable */
export function useNotes() {
    const { db } = useFirebase();

    const allNotes = ref<Note[]>([]);
    const notesUnsubscribe = ref<Unsubscribe | undefined>(undefined);

    const getAllNotes = async (): Promise<Note[]> => {
        const notes: Note[] = [];

        const querySnapshot: QuerySnapshot<Note> = await getDocs(collection(db, 'notes').withConverter(noteConverter));
        querySnapshot.forEach((doc: QueryDocumentSnapshot<Note>) => {
            notes.push(doc.data());
        });

        return notes;
    }

    const subscribeToAllNotes = () => {
        const q = query(collection(db, 'notes').withConverter(noteConverter));
        notesUnsubscribe.value = onSnapshot(q, (querySnapshot: QuerySnapshot<Note>) => {
            const result: Note[] = [];

            querySnapshot.forEach((doc: QueryDocumentSnapshot<Note>) => {
                result.push(doc.data());
            });

            allNotes.value = [...result];
        });
    }

    const addNote = async (note: Note) => {
        await addDoc(collection(db, 'notes').withConverter(noteConverter), note);
    }

    const updateNotePosition = async (id: string, position: Position) => {
        const docRef: DocumentReference = doc(db, 'notes', id);
        await updateDoc(docRef, {
            position: {
                left: position.left,
                top: position.top
            }
        });
    }

    const unsubscribeFromAllNotes = () => {
        if (notesUnsubscribe.value) {
            notesUnsubscribe.value();
            notesUnsubscribe.value = undefined;
        }
    }

    return { allNotes, getAllNotes, subscribeToAllNotes, unsubscribeFromAllNotes, addNote, updateNotePosition }
}
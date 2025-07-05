/** Libraries */
import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

/** Models */
import { Note } from '../models';

export const noteConverter = {
    toFirestore: (note: Note) => {
        return {
            text: note.text,
            position: note.position
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data: DocumentData = snapshot.data(options);

        const note: Note = new Note(snapshot.id, data.text);

        if (
            data.position &&
            typeof data.position.top === 'number' &&
            typeof data.position.left === 'number'
        ) {
            note.addPosition({ top: data.position.top, left: data.position.left });
        } else {
            note.addPosition({ top: 50, left: 50 });
        }

        return note;
    }
};
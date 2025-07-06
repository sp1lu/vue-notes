/** Libraries */
import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

/** Models */
import { Note } from '../models';

export const noteConverter = {
    toFirestore: (note: Note) => {
        return {
            text: note.text,
            user: note.user,
            position: note.position,
            color: note.color
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data: DocumentData = snapshot.data(options);

        const note: Note = new Note(snapshot.id, data.text, data.user);

        if ('color' in data && typeof data.color === 'string') note.addColor(data.color);

        if (
            data.position &&
            typeof data.position.top === 'number' &&
            typeof data.position.left === 'number'
        ) {
            note.addPosition({ top: data.position.top, left: data.position.left });
        }

        return note;
    }
};
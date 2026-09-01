
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Notes } from "./getNotes";

async function getNoteByid(id: string | undefined ):Promise<Notes> {
    const noteRef = doc(db, "Notes", id);
    const snapshot = await getDoc(noteRef);
    if (!snapshot.exists()) {
        throw new Error("Note not found");
    }
    return { id: snapshot.id, ...snapshot.data() } as Notes;
}


export default getNoteByid;

import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";



async function deleteAllNotes(userId: string | undefined) {
    const noteColletion = collection(db, "Notes");
    const q = query(noteColletion, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map((noteDoc) =>
        deleteDoc(doc(db, "Notes", noteDoc.id))
    );
    await Promise.all(deletePromises);
}


export default deleteAllNotes;
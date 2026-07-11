import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";



async function deleteNote(id:string){
    const note = doc(db, "Notes" ,id);
    await deleteDoc(note);
}

export default deleteNote ;
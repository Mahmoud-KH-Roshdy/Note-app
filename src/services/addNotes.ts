import { addDoc, collection } from "firebase/firestore";
import type { Notes } from "./getNotes";
import { db } from "./firebase";



async function newNotes(newNote:{title:string ,body: string}) {

         const notesCollections = collection(db,"Notes");
    const docRef = await addDoc(notesCollections,{
        title:newNote.title,
        body:newNote.body,
        time: new Date(),
    })
    return docRef.id ;
}






export default newNotes ;
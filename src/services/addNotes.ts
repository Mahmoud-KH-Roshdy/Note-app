import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";



async function newNotes(newNote:{title:string ,body: string}) {
    const user = auth.currentUser ;
         const notesCollections = collection(db,"Notes");
    const docRef = await addDoc(notesCollections,{
        title:newNote.title,
        body:newNote.body,
        userId:user?.uid,
        time: new Date(),
    })
    return docRef.id ;
}






export default newNotes ;
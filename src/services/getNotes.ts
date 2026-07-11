import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export interface Notes {
    title: string ;
    body: string ; 
    time: string ;
    id: string  ;
}

async function getNotes():Promise<Notes[]> {
    const notesCollection = collection(db,"Notes");
    const q = query(notesCollection, orderBy("time", "desc"));
    const notes = await getDocs(q);
    return notes.docs.map((doc) => (
        {...doc.data()  as Omit<Notes,"id">  ,id:doc.id}
    ))
}


export default getNotes

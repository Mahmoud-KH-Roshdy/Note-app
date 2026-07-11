import {  doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

interface UpdateDate {
    title:string ;
    body:string ;
    time: any ;
}

async  function updateNote({id,data} :{id:string , data:UpdateDate}){
    const note = doc(db,"Notes",id);
    await updateDoc(note,{
        title:data.title,
        body:data.body,
        time: new Date(),
    })
}


export default updateNote ;
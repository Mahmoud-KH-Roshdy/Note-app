import { signOut } from "firebase/auth";
import { auth } from "./firebase";

async function logout(){
    return await signOut(auth)
}

export default logout ;
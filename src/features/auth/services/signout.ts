import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";

async function logout(){
    return await signOut(auth)
}

export default logout ;
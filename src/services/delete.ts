import { deleteUser } from "firebase/auth";
import { auth } from "./firebase";

 async function deleteAccount() {
    const user = auth.currentUser ;
   if (user) {
      await deleteUser(user);
    }
}

export default deleteAccount ;
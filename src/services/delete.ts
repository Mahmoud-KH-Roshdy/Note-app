import { deleteUser } from "firebase/auth";
import { auth } from "./firebase";
import deleteAllNotes from "./deleteAllNotes";

async function deleteAccount() {
   const user = auth.currentUser;
   if (user) {
      await deleteAllNotes(user.uid);
      await deleteUser(user);
   }
}

export default deleteAccount;
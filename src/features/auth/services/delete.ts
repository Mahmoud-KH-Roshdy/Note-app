import { deleteUser } from "firebase/auth";
import { auth } from "../../../services/firebase";
import deleteAllNotes from "../../note/services/deleteAllNotes";

async function deleteAccount() {
   const user = auth.currentUser;
   if (user) {
      await deleteAllNotes(user.uid);
      await deleteUser(user);
   }
}

export default deleteAccount;
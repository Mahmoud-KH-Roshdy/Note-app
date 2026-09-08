import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

export function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}




import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebase";




interface AuthContextType {
    user: User | undefined,
    loading: boolean,
    setUser: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>();


export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
 
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(undefined);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser,loading }}>
            {children}
        </AuthContext.Provider>
    )
}

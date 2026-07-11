import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Notes } from "../services/getNotes";

interface UiContextType {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeNote: Notes | null;
    setActiveNote: React.Dispatch<React.SetStateAction<Notes | null>>;
    activeNoteId: string | undefined,
}

const UiContext = createContext<UiContextType | null>(null);

function UiContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(window.innerWidth <= 768);
    const [activeNote, setActiveNote] = useState<Notes | null>(null);
    const activeNoteId = activeNote?.id;
    return (
        <UiContext.Provider value={{ isOpen, setOpen, activeNote, setActiveNote, activeNoteId }}>
            {children}
        </UiContext.Provider>
    )
}
export function useUi() {
    const context = useContext(UiContext);
    if (!context) {
        throw new Error("useUi must be used within a UiContextProvider");
    }
    return context;
}

export default UiContextProvider; 
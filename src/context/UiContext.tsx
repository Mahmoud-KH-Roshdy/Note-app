import React, { createContext, useContext, useState, type ReactNode } from "react";

interface UiContextType {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showFormMobile:boolean;
    setShowFormMobile:React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextType | null>(null);

function UiContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(window.innerWidth <= 768);
    const [showFormMobile, setShowFormMobile] = useState(false);
    return (
        <UiContext.Provider value={{ isOpen, setOpen , showFormMobile ,setShowFormMobile  }}>
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
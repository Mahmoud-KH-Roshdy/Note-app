import { HiBars3BottomRight } from "react-icons/hi2";
import { useUi } from "../context/UiContext";


export default function NavToggleBtn({className}:{className:string}) {
    const { isOpen, setOpen } = useUi();
    return (
        <>
            {isOpen ? <button aria-label="close side-bar" onClick={() => setOpen((open: boolean) => !open)}> < HiBars3BottomRight className={className} /> </button> : ""}
        </>
    )
}

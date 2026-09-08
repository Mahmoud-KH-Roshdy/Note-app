import { HiBars3BottomRight } from "react-icons/hi2";
import { useUi } from "../context/UiContext";


export default function NavToggleBtn({className}:{className:string}) {
    const { isOpen, setOpen } = useUi();
    return (
        <>
            {isOpen ? <span onClick={() => setOpen((open: boolean) => !open)}> < HiBars3BottomRight className={className} /> </span > : ""}
        </>
    )
}

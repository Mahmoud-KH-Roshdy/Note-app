import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { useUi } from "../context/UiContext";
function Header() {
    const { isOpen, setOpen, setActiveNote } = useUi();

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex place-content-center ">
                    {isOpen ? <span onClick={() => setOpen((open: boolean) => !open)}> <HiBars3BottomRight className="hover:bg-slate-700/50 fill-[#7B7D7D]  h-auto w-7 cursor-pointer hover:fill-white transition-colors " /> </span> : ""}
                    <h1 className="text-xl font-bold text pl-2 text-[#434343] ">Notes</h1>
                </div>
                <div className=" flex place-content-center ">
                    <IoIosSearch className="h-auto w-8 cursor-pointer fill-[#8E8E8E] pr-2  transition-all duration-500 hover:fill-black" />
                    <RiStickyNoteAddFill onClick={() => setActiveNote(null)} className="h-auto w-5 cursor-pointer fill-[#8E8E8E] transition-all duration-500 hover:fill-black" />
                </div>
            </div>
        </div>
    )
}

export default Header;

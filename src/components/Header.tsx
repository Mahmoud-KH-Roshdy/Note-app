import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import MobileNavToggle from "./MobileNavToggle";
import NavToggleBtn from "./NavToggleBtn";
function Header() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex place-content-center ">
                    <NavToggleBtn className="hover:bg-slate-700/50 fill-[#7B7D7D]  h-auto w-7 cursor-pointer hover:fill-white transition-colors"/>
                    <h1 className="text-xl font-bold text pl-2 text-[#434343] cursor-pointer " onClick={() => navigate("/")} >Notes</h1>
                </div>
                <div className=" flex place- items-center justify-center ">
                    <IoIosSearch className="h-auto w-8 cursor-pointer fill-[#8E8E8E] pr-2  transition-all duration-500 hover:fill-black" />
                    <MobileNavToggle/>
                </div>
            </div>
        </div>
    )
}

export default Header;


import { RiArrowLeftLine, RiStickyNoteAddFill } from "react-icons/ri";
import { useUi } from "../context/UiContext";
import { useNavigate, useParams } from "react-router";
export default function MobileNavToggle() {
    const { setShowFormMobile, showFormMobile } = useUi();
    const { id } = useParams()
    const navigate = useNavigate();
    const isFormOpen = Boolean(id) || showFormMobile;
    function handleClick() {
        if (showFormMobile || id) {
            navigate("/");
            if (window.innerWidth <= 768) {
                setShowFormMobile(false);
            }
        } else {
            if (window.innerWidth <= 768) {
                setShowFormMobile(true);
            }
        }
    }
    return (
        <div onClick={() => handleClick()}>
            {
                isFormOpen ? <RiArrowLeftLine className="h-auto w-5 cursor-pointer fill-[#8E8E8E] transition-all duration-500 hover:fill-black" /> : <RiStickyNoteAddFill className="h-auto w-5 cursor-pointer fill-[#8E8E8E] transition-all duration-500 hover:fill-black" />
            }
        </div>
    )
}

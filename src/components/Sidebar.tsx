import { FaStickyNote, } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useUi } from "../context/UiContext";
import { Link } from "react-router";
import { IoSettings } from "react-icons/io5";
import { useTranslation } from "react-i18next";
const liLists = [
  { titleEn: "Notes", titleAr: "الملاحظات", icon: <FaStickyNote />, id: 1, path: "/" },
  { titleEn: "Setting", titleAr: "الاعدادات", icon: <IoSettings />, id: 2, path: "/setting" },
];

export default function Sidebar() {
  const { isOpen, setOpen } = useUi();
  const { i18n } = useTranslation();
  function handleClickOnMobile() {
    if (window.innerWidth <= 768) {
      setOpen(() => true)
    }
  }
  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setOpen(true)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
        />
      )}
      <div>
        <aside
          className={`
          dark:bg-[#1F1F1F] bg-[#2E3235] selection:text-white text-[#FCFCFC]
          overflow-hidden transition-all duration-300 z-50
          fixed top-0 bottom-0 left-0 h-screen shadow-2xl
          ${isOpen ? "w-0 p-0" : "w-72 p-5"}
          md:sticky md:top-0 md:h-screen md:shadow-none md:border-r md:border-slate-800
          ${isOpen ? "md:w-0 md:p-0" : "md:w-64 md:p-5"}
        `}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-[#D0D1D4] font-semibold text-lg tracking-wide">
              Mahmoud
            </span>
            <button
              onClick={() => setOpen((open: boolean) => !open)}
              aria-label="close side bar"
              className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <HiBars3BottomLeft className="fill-[#7B7D7D] h-auto w-7 cursor-pointer hover:fill-white transition-colors" />
            </button>
          </div>
          <ul className="flex flex-col  gap-1 text-[16px]" dir={i18n.language === "en" ?  `ltl` : `rtl`}>
            {liLists.map((list) => (
              <li key={list.id}>
                <Link to={list.path} onClick={handleClickOnMobile} className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#474747] transition-all duration-200 active:scale-[0.98]">
                  <span className="text-lg text-slate-300">{list.icon}</span>
                  <span className="font-medium">{i18n.language === "en" ?  list.titleEn : list.titleAr}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
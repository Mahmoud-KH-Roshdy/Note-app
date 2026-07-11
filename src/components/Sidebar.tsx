

import { FaArchive, FaStickyNote, FaTrash } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoIosListBox } from "react-icons/io";
import {useUi} from "../context/UiContext"
const liLists = [{
  title: "Note",
  icon:<FaStickyNote />,
  id:1,
},
{
  title: "To-do",
  icon:<IoIosListBox />,
    id:2,
},
{
  title: "Archive",
  icon:<FaArchive />,
    id:3,
},
{
  title: "Trash",
  icon: <FaTrash />,
    id:4,
},
]
export default function Sidebar() {
  const {isOpen , setOpen } = useUi() ;
  return (
    <>
      <aside className={`dark:bg-[#1F1F1F] selection:text-white bg-[#2E3235]  overflow-hidden transition-all duration-300 ${isOpen ? `w-0 p-0` : `w-65 p-4`}`}>
        <div className="flex justify-between items-center  ">
          <span className="text-[#D0D1D4]"> Mahmoud </span>
          <span onClick={() => setOpen((open: boolean) => !open)}> <HiBars3BottomLeft className="fill-[#7B7D7D]  h-auto w-7 cursor-pointer transition-all duration-750 hover:fill-white " /> </span>
        </div>
        <ul className=" flex justify-center  flex-col mt-8 mb-2 text-[#FCFCFC] text-[18px] ">
          {
            liLists.map((list) => <li className="flex items-center p-1.25 m-2 transition-all duration-300 hover:bg-[#474747] hover:rounded-2xl hover:p-2 cursor-pointer " key={list.id}>
              {list.icon}
              <span className="pl-3 ">{list.title}</span>
            </li>)
          }
        </ul>
      </aside>
    </>
  )
}


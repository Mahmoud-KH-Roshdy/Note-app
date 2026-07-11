import Header from "./Header"
import GetNotes from "../features/Notes/GetNotes";
export default function ShowNotes() {

    return (
        <>
            <main className="  border-r border-[#C3C5C7] bg-[#FFFFFF] p-4 overflow-y-auto transition-all duration-500 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#E4E6EB]
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-[#D1D5DB]">
                <Header />
                <GetNotes />
            </main>
        </>
    )
}

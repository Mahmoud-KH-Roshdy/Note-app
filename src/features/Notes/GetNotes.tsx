

import { useQuery } from "@tanstack/react-query";
import getNotes, { type Notes } from "../../services/getNotes";
import Loading from "../../components/Loading"
import { useUi } from "../../context/UiContext";
import { time } from "../../utils/helpers";
function GetNotes() {
    const { isPending, error, data } = useQuery<Notes[]>({
        queryKey: ["Notes"],
        queryFn: getNotes,
    });
    const {  setActiveNote , activeNoteId } = useUi();
    if (isPending) return <Loading />;
    if (error) return <p>error</p> ;
    return (
        <section className=" grid grid-cols-[auto] py-4 gap-4 ">
            {data?.map((note) => <div className={` p-4 cursor-pointer   ${activeNoteId === note.id ? `  border-l-5 border-[#D64E51]  bg-[#F4F5F7] rounded-xl` : ` border-b border-[#C3C5C7] `} `} key={note.id} onClick={() => setActiveNote(note)}>
                <h2 className="title text-[18px]"> {note.title} </h2>
                <p className=" text-[##838586] text-[15px] py-1 ">{(note.body).slice(0,90)}...</p>
                <span className="text-[#C1C2C4] ">{time(note.time)}</span>
            </div>)}
        </section>
    )
}
export default GetNotes;


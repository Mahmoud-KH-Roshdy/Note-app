

import { useQuery } from "@tanstack/react-query";
import getNotes, { type Notes } from "../services/getNotes";
import Loading from "./Loading"
import { time } from "../utils/helpers";
import { Link, useParams } from "react-router";
import EmptyNotes from "./EmptyNotes";
function GetNotes() {
    const { isPending, error, data:notes } = useQuery<Notes[]>({
        queryKey: ["Notes"],
        queryFn: getNotes,
    });
    const {id:activeNoteId} = useParams();
        const isActiveNoteId = Boolean(activeNoteId);
    if (isPending) return <Loading />;
    if (error) return  <p> {error.message}   </p> ;
    if(notes?.length === 0) return <EmptyNotes/>;
    return (
        <section className={`sm:grid sm:grid-cols-[auto] py-4 gap-4$ ${ isActiveNoteId ? `hidden` : `flex flex-col ` } `}>
            {notes?.map((note) => <Link to={`/note/${note.id}`}  className={` p-4 cursor-pointer   ${activeNoteId === note.id ? `  border-l-5 border-[#D64E51]  bg-[#F4F5F7] rounded-xl` : ` border-b border-[#C3C5C7] `} `} key={note.id}>
                <h2 className="title text-[18px]"> {note.title} </h2>
                <p className=" text-[##838586] text-[15px] py-1 ">{(note.body).slice(0,90)}...</p>
                <span className="text-[#C1C2C4] ">{time(note.time)}</span>
            </Link>)}
        </section>
    )
}
export default GetNotes;


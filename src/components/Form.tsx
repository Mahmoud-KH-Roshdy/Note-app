
import {  useParams } from "react-router";
import getNoteById from "../services/getNoteById";
import Loading from "./Loading";
import NoteForm from "./NoteForm";
import { useQuery } from "@tanstack/react-query";
import type { Notes } from "../services/getNotes";
export default function Form() {
    const { id: activeNoteId } = useParams();
    const isActiveNoteId = Boolean(activeNoteId);
    // Get Active Data
    const { data: activeNote, isLoading: isNoteLoading, error: noteError } = useQuery<Notes>({
        queryKey: ["Notes", activeNoteId],
        queryFn: () => getNoteById(activeNoteId),
        enabled: isActiveNoteId,
    });
        if (isActiveNoteId && isNoteLoading) {
        return <Loading />;
    }
            if (noteError) {
        console.error(noteError)
    }
    return(
        <NoteForm activeNote={activeNote} isActiveNoteId={isActiveNoteId} />
    )
}

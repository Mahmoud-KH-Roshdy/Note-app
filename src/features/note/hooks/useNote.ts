import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import updateNote from "../services/updateNote";
import type { Notes } from "../services/getNotes";
import newNotes from "../services/addNotes";

interface NoteInputs {
    title: string;
    body: string;
    time: string;
}
interface NoteFormInput {
    isActiveNoteId: boolean;
    activeNote: Notes | undefined;
}


function useNote( {isActiveNoteId, activeNote} : NoteFormInput) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<NoteInputs>({ defaultValues: activeNote ? activeNote : {} });
    // Create A New Note
    const { mutate: createdFn, isPending: isCreating } = useMutation({
        mutationFn: newNotes,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            navigate(`/note/${data}`)
            toast.success("Created Successfully");
        },
        onError: (error) => {
            toast.error("Failed To Create");
            console.error(error.message);
        }
    })
    function onSubmit(data: NoteInputs) {
        if (isActiveNoteId && activeNote) {
            if (data.title.trim() === activeNote.title && data.body.trim() === activeNote.body) {
                toast.error("No change were made")
                return;
            }
            else {
                updateFn({ id: activeNote.id, data });
            }
        } else {
            createdFn(data);
        }
    }
    // Update a Note  
    const { mutate: updateFn, isPending: isUpdate } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] })
            toast.success("Update Successfully")
        }
    })
    return {
        register,
        errors,
        onSubmit: handleSubmit(onSubmit),
        isLoading: isCreating || isUpdate,
    };
}

export default useNote ;
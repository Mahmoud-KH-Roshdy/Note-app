import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import newNotes from "../services/addNotes";
import { useUi } from "../context/UiContext";
import deleteNote from "../services/deleteNote";
import type { Notes } from "../services/getNotes";
import { toast } from "react-hot-toast";
import updateNote from "../services/updateNote";


interface NoteInputs {
    title: string;
    body: string;
    time: string | any ,
}

export default function Form() {
    const { activeNote, setActiveNote , activeNoteId } = useUi();
    const isActiveNoteId = Boolean(activeNoteId);
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm<NoteInputs>({ defaultValues: activeNote ? activeNote : {} });
    // Create A New Note
    const { mutate: createdFn, isPending: isCreating } = useMutation({
        mutationFn: newNotes,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            const newNote: Notes = {
                title: variables.title,
                body: variables.body,
                id: data,
                time: new Date(),
            }

            setActiveNote(newNote);
            toast.success("Created Successfully");
        },
        onError: (error) => {
            toast.error("Failed To Create");
            console.error(error.message);
        }
    })
    function onSumbit(data: NoteInputs) {
        if (isActiveNoteId && activeNote && activeNote.id) {
            
            updateFn({ id: activeNote.id, data });
        } else {
            createdFn(data);
        }
    }
    // Delete A Note
     const { mutate: deletedFn, isPending: isDeleting } = useMutation({
         mutationFn: deleteNote,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["Notes"] });
             setActiveNote(null);
             toast.success("Delteted Successfully");
         },
         onError: (error) => {
             toast.error("Failed To Delete");
             console.error(error.message);
         }
     })
     function hanldeDelete(id: string ) {
         deletedFn(id);
     }
    // Update a Note  
    const { mutate: updateFn, isPending: isUpdate } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] })
            toast.success("Update Successfully")
        }
    })
    return (
        <>
            <form className="p-4 flex flex-col justify-center h-full gap-4" onSubmit={handleSubmit(onSumbit)}>
                <header className="flex justify-center items-center ">
                    <input type="text" className="focus:outline-0 title  text-[18px] w-full" placeholder="Title" {...register("title", { required: "The title is requrid to add new note" })} />
                </header>
                <textarea id="text" className=" flex-1 w-full focus:outline-0 resize-none text-xl" placeholder="Note.." {...register("body", { required: "The note is requrid to add new note" })}></textarea>
                <div className="flex justify-center gap-2">
                    <button
                        type="submit"
                        className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                        disabled={isCreating || isDeleting}
                    >
                        {`${isActiveNoteId ? "Edit Note" : "Save Note"}`}
                    </button>

                    <button
                        type="button"
                        className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                        disabled={isCreating || isDeleting || isUpdate}
                        onClick={() => hanldeDelete(activeNoteId)}
                    >
                        delete
                    </button>
                </div>

            </form>
        </>
    )
}

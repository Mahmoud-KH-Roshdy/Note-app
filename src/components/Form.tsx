import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import newNotes from "../services/addNotes";
import { useUi } from "../context/UiContext";
import type { Notes } from "../services/getNotes";
import { toast } from "react-hot-toast";
import updateNote from "../services/updateNote";
import DeleteNote from "./DeleteNote";


interface NoteInputs {
    title: string;
    body: string;
    time: string  ,
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
                time: new Date().toISOString(),
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
        if (isActiveNoteId && activeNote && activeNote.id ) {
            if( data.title.trim() === activeNote.title &&  data.body.trim() === activeNote.body) {
                toast.error("No change were made")
                return ;
            }
            else{
                updateFn({ id: activeNote.id, data });
            }
        } else {
            if(!data.title.trim() ||  !data.body.trim()){
                toast.error("Please Enter a valid title and note context");
                return;
            } else{
                createdFn(data);
            }
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
                        disabled={isCreating ||  isUpdate}
                    >
                        {`${isActiveNoteId ? "Edit Note" : "Save Note"}`}
                    </button>
                    <DeleteNote isCreating={isCreating} isUpdate={isUpdate}/>
                </div>

            </form>
        </>
    )
}

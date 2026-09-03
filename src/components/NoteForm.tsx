import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import newNotes from "../services/addNotes";
import { toast } from "react-hot-toast";
import updateNote from "../services/updateNote";
import DeleteNote from "./DeleteNote";
import type { Notes } from "../services/getNotes";
import { useNavigate } from "react-router";
import { useUi } from "../context/UiContext";
import FormError from "./FormError";
interface NoteInputs {
    title: string;
    body: string;
    time: string;
}
interface NoteFormInput {
    activeNote: Notes | undefined;
    isActiveNoteId: boolean;
}

export default function Form({ activeNote, isActiveNoteId }: NoteFormInput) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit ,formState: { errors } } = useForm<NoteInputs>({ defaultValues: activeNote ? activeNote : {} });
    // Create A New Note
    const { mutate: createdFn, isPending: isCreating  } = useMutation({
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
    const { showFormMobile } = useUi();
    function onSumbit(data: NoteInputs) {
        if ( isActiveNoteId &&  activeNote ) {
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



    return (
        <div className={`sm:block bg-gray-50 h-full overflow-hidden ${isActiveNoteId || showFormMobile ? `` : `hidden`}`} >
            <form className={`p-4 sm:flex sm:flex-col sm:justify-center h-full gap-4 ${isActiveNoteId || showFormMobile ? `flex flex-col justify-center` : `hidden`}`} onSubmit={handleSubmit(onSumbit)} >
                <header className="flex justify-center items-center ">
                    <input type="text" className="focus:outline-0 title  text-[18px] w-full" placeholder="Title" {...register("title", { required: "The title is requrid to add new note" })} />
                    <FormError message={errors.title?.message} />
                </header>
                <textarea id="text" className=" flex-1 w-full focus:outline-0 resize-none text-xl" placeholder="Note.." {...register("body", { required: "The note is requrid to add new note" })}></textarea>
                <FormError message={errors.body?.message} />
                <div className="flex justify-center gap-2">
                    <button
                        type="submit"
                        className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                        disabled={isCreating || isUpdate}
                    >
                        {`${isActiveNoteId ? "Edit Note" : "Save Note"}`}
                    </button>
                    <DeleteNote isCreating={isCreating} isUpdate={isUpdate} />
                </div>

            </form>
        </div>
    )
}

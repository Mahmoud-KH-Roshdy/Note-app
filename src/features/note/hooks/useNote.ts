import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
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

function useNote({ isActiveNoteId, activeNote }: NoteFormInput) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm<NoteInputs>({
        defaultValues: activeNote ? activeNote : {}
    });
    // Create A New Note
    const { mutate: createdFn, isPending: isCreating } = useMutation({
        mutationFn: newNotes,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            navigate(`/note/${data}`);
            toast.success(t("notes.toast.createSuccess"));
        },
        onError: (error) => {
            toast.error(t("notes.toast.createError"));
            console.error(error.message);
        }
    });
    // Update a Note
    const { mutate: updateFn, isPending: isUpdate } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            toast.success(t("notes.toast.updateSuccess"));
        }
    });
    function onSubmit(data: NoteInputs) {
        if (isActiveNoteId && activeNote) {
            if (data.title.trim() === activeNote.title && data.body.trim() === activeNote.body) {
                toast.error(t("notes.toast.noChanges"));
                return;
            } else {
                updateFn({ id: activeNote.id, data });
            }
        } else {
            createdFn(data);
        }
    }

    return {
        register,
        errors,
        onSubmit: handleSubmit(onSubmit),
        isLoading: isCreating || isUpdate,
    };
}

export default useNote;
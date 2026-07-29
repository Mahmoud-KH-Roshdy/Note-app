
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUi } from '../context/UiContext';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import deleteNote from '../services/deleteNote';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function DeleteNote({ isUpdate, isCreating }) {
    const { activeNoteId, setActiveNote } = useUi();
    const [isOpen, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();
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
    function hanldeDelete(id: string) {
        deletedFn(id);
    }
    return (
        <>
            <button
                type="button"
                className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                disabled={isCreating || isDeleting || isUpdate}
                onClick={() => setOpen(true)}
            >
                delete
            </button>
            <ConfirmDeleteModal isOpen={isOpen} onOpenChange={setOpen}  title={"Del"} confrimText={"delete Note"} children={"Are you sure you want to delete this note? This action cannot be undone."} isDeleting={isDeleting} onConfirm={() => hanldeDelete(activeNoteId)} />
        </>
    )
}

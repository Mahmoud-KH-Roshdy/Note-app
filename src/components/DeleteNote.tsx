
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import deleteNote from '../services/deleteNote';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
interface PropsType {
    isUpdate: boolean,
    isCreating: boolean,
}
export default function DeleteNote({ isUpdate, isCreating }: PropsType) {
    const {id} = useParams()
    const [isOpen, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: deletedFn, isPending: isDeleting } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            toast.success("Delteted Successfully");
            navigate("/")
        },
        onError: (error) => {
            toast.error("Failed To Delete");
            console.error(error.message);
        }
    })
    function hanldeDelete() {
        if (!id) return;
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
            <ConfirmDeleteModal isOpen={isOpen} onOpenChange={setOpen} title={"Delete"} confrimText={"delete Note"} children={"Are you sure you want to delete this note? This action cannot be undone."} isDeleting={isDeleting} onConfirm={() => hanldeDelete()} />
        </>
    )
}

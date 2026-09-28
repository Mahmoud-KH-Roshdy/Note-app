
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import deleteNote from '../services/deleteNote';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
interface PropsType {
    isLoading: boolean,
}
export default function DeleteNote({ isLoading }: PropsType) {
    const { id } = useParams();
    const { t } = useTranslation();
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
                aria-label="Delete note"
                className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                disabled={isLoading || isDeleting}
                onClick={() => setOpen(true)}
            >
                {t("notes.deleteNote")}
            </button>
            <ConfirmDeleteModal isOpen={isOpen} onOpenChange={setOpen} title={t("modals.deleteNote.title")}
                confirmText={t("modals.deleteNote.confirmText")}
                children={t("modals.deleteNote.message")}
                isDeleting={isDeleting} onConfirm={() => hanldeDelete()} />
        </>
    )
}

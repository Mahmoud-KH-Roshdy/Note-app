import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDeleteNote from '../hooks/useDeleteNote';
interface PropsType {
    isLoading: boolean;
}
export default function DeleteNote({ isLoading }: PropsType) {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState<boolean>(false);
    const { isDeleting, handleDelete } = useDeleteNote();
    return (
        <>
            <button
                type="button"
                aria-label="Delete note"
                className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || isDeleting}
                onClick={() => setOpen(true)}
            >
                {t("notes.deleteNote")}
            </button>
            <ConfirmDeleteModal
                isOpen={isOpen}
                onOpenChange={setOpen}
                title={t("modals.deleteNote.title")}
                confirmText={t("modals.deleteNote.confirmText")}
                isDeleting={isDeleting}
                onConfirm={handleDelete}
            >
                {t("modals.deleteNote.message")}
            </ConfirmDeleteModal>
        </>
    );
}
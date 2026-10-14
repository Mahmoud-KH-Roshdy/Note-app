import { useTranslation } from "react-i18next";
import deleteAllNotes from "../../note/services/deleteAllNotes";
import { auth } from "../../../services/firebase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function useDeleteNotes() {
    const { t } = useTranslation()
    const { mutate: handleDeleteAllNotes, isPending: isDeleting } = useMutation({
        mutationFn: () => deleteAllNotes(auth.currentUser?.uid),
        onSuccess: () => {
            toast.success( t("settings.notes.deleteSuccess") );
        },
        onError: (error) => {
            if (error) toast.error( t("settings.notes.deleteSuccess") );
            console.error(error.cause);
        }
    });
    return {
        handleDeleteAllNotes,
        isDeleting,
    }
}

export default useDeleteNotes

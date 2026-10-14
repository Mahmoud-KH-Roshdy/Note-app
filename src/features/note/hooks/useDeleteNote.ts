import { useNavigate, useParams } from "react-router";
import deleteNote from "../services/deleteNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useDeleteNote() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: deletedFn, isPending: isDeleting } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Notes"] });
            toast.success(t("notes.toast.deleteSuccess"));
            navigate("/");
        },
        onError: (error) => {
            toast.error(t("notes.toast.deleteError"));
            console.error(error.message);
        }
    });

    function handleDelete() {
        if (!id) return;
        deletedFn(id);
    }
    return {
        isDeleting,
        handleDelete,
    }
}

export default useDeleteNote

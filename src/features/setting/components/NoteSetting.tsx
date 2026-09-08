import { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import deleteAllNotes from "../../note/services/deleteAllNotes";
import { auth } from "../../../services/firebase";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import SettingActionRow from "./SettingActionRow";


export default function NoteSetting() {
    const [wantDeleteNotes, setWantDeleteNotes] = useState<boolean>(false);
    const { mutate: handleDeleteAllNotes, isPending: isDeleting } = useMutation({
        mutationFn: () => deleteAllNotes(auth.currentUser?.uid),
        onSuccess: () => {
            toast.success(" Deleted Successfully");
        },
        onError: (error) => {
            if (error) toast.error("Faild to delete All notes");
            console.error(error.cause);
        }
    });
    return (
        <section>
            <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Notes</h1>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                <SettingActionRow title="Delete all notes" description="Permanently remove every note you've written<" onClick={() => setWantDeleteNotes(true)} disabled={isDeleting} buttonText=" Delete Notes" buttonVariant="danger" />
                <ConfirmDeleteModal
                    isOpen={wantDeleteNotes}
                    onOpenChange={setWantDeleteNotes}
                    title={"Delete Notes"}
                    confrimText={"Delete Notes"}
                    children={"Are you sure you want to delete All Notes?"}
                    isDeleting={isDeleting}
                    onConfirm={handleDeleteAllNotes}
                />
            </div>
        </section>
    )
}

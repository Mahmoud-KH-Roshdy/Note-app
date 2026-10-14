import { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import SettingActionRow from "./SettingActionRow";
import { useTranslation } from "react-i18next";
import useDeleteNotes from "../hooks/useDeleteNotes";


export default function NoteSetting() {
    const [wantDeleteNotes, setWantDeleteNotes] = useState<boolean>(false);
    const { i18n, t } = useTranslation();
    const {handleDeleteAllNotes,isDeleting} = useDeleteNotes();
    return (
        <section className="" dir={ i18n.language === "en" ? "ltl":"rtl"}>
            <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{t("settings.notes.sectionTitle")}</h1>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                <SettingActionRow
                    title={t("settings.notes.deleteAllTitle")}
                    description={t("settings.notes.deleteAllDescription")}
                    onClick={() => setWantDeleteNotes(true)}
                    disabled={isDeleting}
                    buttonText={t("settings.notes.deleteBtn")}
                    buttonVariant="danger"
                />                <ConfirmDeleteModal
                    isOpen={wantDeleteNotes}
                    onOpenChange={setWantDeleteNotes}
                    title={t("modals.deleteNotes.title")}
                    confirmText={t("modals.deleteNotes.confirm")}
                    isDeleting={isDeleting}
                    onConfirm={handleDeleteAllNotes}
                >
                    {t("modals.deleteNotes.message")}
                </ConfirmDeleteModal>
            </div>
        </section>
    )
}

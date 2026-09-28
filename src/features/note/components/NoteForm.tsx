import type { Notes } from "../services/getNotes";
import { useUi } from "../../../context/UiContext";
import FormError from "../../../components/FormError";
import { useTranslation } from "react-i18next";
import useNote from "../hooks/useNote";
import DeleteNote from "./DeleteNote";

interface NoteFormInput {
    activeNote: Notes | undefined;
    isActiveNoteId: boolean;
}

export default function Form({ activeNote, isActiveNoteId }: NoteFormInput) {
    const { t } = useTranslation();
    const { showFormMobile } = useUi();
    const { register, errors, onSubmit, isLoading } =
    useNote({ activeNote, isActiveNoteId });
    return (
        <div className={`sm:block bg-gray-50 h-full overflow-hidden ${isActiveNoteId || showFormMobile ? `` : `hidden`}`} >
            <form className={`p-4 sm:flex sm:flex-col sm:justify-center h-full gap-4 ${isActiveNoteId || showFormMobile ? `flex flex-col justify-center` : `hidden`}`} onSubmit={onSubmit} >
                <header className="flex justify-center items-center ">
                    <input dir="auto" type="text" className="focus:outline-0 title text-xl font-bold w-full" placeholder={t("notes.titlePlaceholder")} {...register("title", { required: "The title is requrid to add new note" })} />
                    <FormError message={errors.title?.message} />
                </header>
                <textarea dir="auto" id="text" className=" flex-1 w-full focus:outline-0 resize-none text-xl" placeholder={t("notes.notePlaceholder")}  {...register("body", { required: "The note is requrid to add new note" })}></textarea>
                <FormError message={errors.body?.message} />
                <div className="flex justify-center gap-2">
                    <button
                        type="submit"
                        aria-label={`${isActiveNoteId ? "Edit Note" : "Save Note"}`}
                        className="bg-[#434343] text-white font-medium text-sm px-5 py-2 rounded-lg self-end hover:bg-black transition-all cursor-pointer"
                        disabled={isLoading}
                    >
                        {`${isActiveNoteId ? t("notes.editNote") : t("notes.saveNote")}`}
                    </button>
                    <DeleteNote isLoading={isLoading}/>
                </div>

            </form>
        </div>
    )
}

import { useParams } from "react-router";
import Form from "../features/note/components/Form"
import ShowNotes from "../features/note/components/ShowNotes";
export default function NotePage() {
    const { id } = useParams();
    return (
        <main className={`  h-screen  block  sm:grid lg:grid-cols-[350px_1fr] sm:grid-cols-[auto_350px_1fr] `}>
            <ShowNotes />
                <Form key={id || "new"} />
        </main>
    )

}

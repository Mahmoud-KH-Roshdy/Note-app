import Sidebar from "./components/Sidebar"
import ShowNotes from "./components/ShowNotes";
import Form from "./components/Form";
import { useUi } from "./context/UiContext";


function App() {
  const { activeNote } = useUi();
  return (
    <main className={` overflow-hidden  h-screen  block  sm:grid lg:grid-cols-[auto_350px_1fr] sm:grid-cols-[auto_350px_1fr] `}>
        <Sidebar/>
        <ShowNotes/>
        <div className="bg-gray-50 h-full overflow-hidden">
          <Form key={activeNote?.id || "new"}/>
        </div>
    </main>
  )
}
export default App;
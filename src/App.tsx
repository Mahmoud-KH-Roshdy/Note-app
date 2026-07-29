
import { createBrowserRouter, RouterProvider } from "react-router";
import NotePage from "./pages/NotePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Setting from "./pages/Setting";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
        <NotePage />
      </ProtectedRoute>,
    },
    {
      path: "/sign",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/setting",
      element: <Setting />,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}
export default App;
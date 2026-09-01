
import { createBrowserRouter, RouterProvider } from "react-router";
import NotePage from "./pages/NotePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Setting from "./pages/Setting";
import Layout from "./components/Layout";


function App() {
  const router = createBrowserRouter([
    {
      element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ),
      children:[
            {path: "/",element: <NotePage />},
            {path: "/note/:id",element: <NotePage />},
            {path: "/setting",element: <Setting />,},
      ]
    },
    {path: "/sign",element: <SignUpPage />,},
    {path: "/login", element: <LoginPage />, },
  ])

  return (
    <RouterProvider router={router} />
  )
}
export default App;
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import {
  AuthScreen,
  AppScreen,
  DashboardScreen,
  TablesScreen,
  SettingsScreen,
} from "screens"

import { ProtectedScreen } from "components"

import { AuthContextProvider } from "contexts"

import 'react-toastify/dist/ReactToastify.css';
import "styles/index.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthScreen />,
  },
  {
    path: "/app",
    element: (
      <ProtectedScreen>
        <AppScreen />
      </ProtectedScreen>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardScreen />,
      },
      {
        path: "tables",
        element: <TablesScreen />,
      },
      {
        path: "settings",
        element: <SettingsScreen />,
      },
    ],
  },
])

const element = document.getElementById("root")
const root = createRoot(element!)
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AuthContextProvider>
)

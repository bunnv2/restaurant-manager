import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import {
  AuthScreen,
  AppScreen,
  DashboardScreen,
  TablesScreen,
  SettingsScreen,
} from "screens"

import { AuthContextProvider } from "contexts"

import "styles/index.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthScreen />,
  },
  {
    path: "/app",
    element: <AppScreen />,
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
  </AuthContextProvider>
)

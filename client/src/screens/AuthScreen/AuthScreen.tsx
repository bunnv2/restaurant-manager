import { useState } from "react"
import { ToastContainer } from "react-toastify"

import { LoginForm, RegisterForm } from "components"

import 'react-toastify/dist/ReactToastify.css';
import "./styles.scss"

const AuthScreen = () => {
  const [view, setView] = useState<string>("login")

  const toggleView = () =>
    setView((prev) => (prev === "login" ? "register" : "login"))

  return (
    <div className="auth">
      {view === "login" ? (
        <LoginForm changeView={toggleView} />
      ) : (
        <RegisterForm changeView={toggleView} />
      )}
      <ToastContainer />
    </div>
  )
}

export default AuthScreen

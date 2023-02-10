import { useState } from "react"

import { LoginForm, RegisterForm } from "components"

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
    </div>
  )
}

export default AuthScreen

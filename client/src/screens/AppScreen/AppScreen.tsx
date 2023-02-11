import { Outlet, Link, useNavigate } from "react-router-dom"

import { Button } from "components"

import { useAuthContext } from "contexts"
import { signOut } from "utils"

import "./styles.scss"

const AppScreen = () => {
  const { setSignedIn } = useAuthContext()
  const navigate = useNavigate()

  const logOut = async () => {
    await signOut
    setSignedIn(false)
    navigate("/")
  }

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__sidebar">
          <div className="app__links">
            <Link className="app__link" to="tables">
              Tables
            </Link>
            <Link className="app__link" to="settings">
              Settings
            </Link>
          </div>
          <Button
            type="button"
            onClick={logOut}
            withIcon
            rounded
            style={{ rotate: "180deg" }}
          ></Button>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AppScreen

import { Outlet, Link } from "react-router-dom"

import { Button } from "components"

import "./styles.scss"

const AppScreen = () => {
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__sidebar">
          <div className="app__links">
            <Link className="app__link" to="dashboard">
              Dashboard
            </Link>
            <Link className="app__link" to="tables">
              Tables
            </Link>
            <Link className="app__link" to="settings">
              Settings
            </Link>
          </div>
          <Button
            type="button"
            // onClick={logOut}
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

import { Outlet, Link } from "react-router-dom"

const AppScreen = () => {
  return (
    <div>
      <div>App Screen</div>
      <Link to="dashboard">See Dashboard</Link>
      <Link to="tables">See Tables</Link>
      <Outlet />
    </div>
  )
}

export default AppScreen

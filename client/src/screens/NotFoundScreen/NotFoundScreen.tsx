import { Link } from "react-router-dom"

import { Header } from "components"

import "./styles.scss"

const NotFoundScreen = () => (
  <div className="not-found">
    <div className="not-found__container">
      <div className="not-found__text">
        <Header variant="h2"> Sorry, page not found 😞</Header>
        <Header variant="h3">Go back to login page</Header>
      </div>
      <Link to="/" className="not-found__link">
        Go back!
      </Link>
    </div>
  </div>
)

export default NotFoundScreen

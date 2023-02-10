import { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

import {Header} from "components"

import { useAuthContext } from "contexts"

import './styles.scss'

const ProtectedScreen: FC<PropsWithChildren> = ({ children }) => {
  const { signedIn } = useAuthContext()

  return signedIn ? (
    <>{children}</>
  ) : (
    <div className="protected">
      <div className="protected__container">
      <Header variant="h2"> Sorry, you have to be logged in to see this page 😞</Header>
      <Link to="/" className="protected__link">Log In!</Link>
      </div>
    </div>
  )
}

export default ProtectedScreen

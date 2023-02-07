import { PropsWithChildren } from "react"

import './styles.scss'

type Props = {
  variant: "h1" | "h2" | "h3"
}

const Header = ({ variant = "h1", children }: PropsWithChildren<Props>) => (
  <div className={`header -${variant}`}>{children}</div>
)

export default Header

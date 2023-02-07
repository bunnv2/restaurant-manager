import { PropsWithChildren } from "react"
import cx from "classnames"

import "./styles.scss"

type Props = {
  type: "button" | "submit" | "reset" | undefined
  rounded?: boolean
  withIcon?: boolean
  iconPosition?: "left" | "right"
  link?: boolean
  onClick?: () => void
  style?: object
}

const Button = ({
  type = "button",
  rounded,
  withIcon,
  iconPosition,
  link,
  onClick,
  style,
  children,
}: PropsWithChildren<Props>) => {
  const buttonClasses = cx("button", {
    "-rounded": rounded,
    [`-icon-${iconPosition}`]: iconPosition,
    "-link": link,
  })

  return (
    <button type={type} className={buttonClasses} onClick={onClick} style={style}>
      {withIcon && <span>&#8594;</span>}
      {children}
    </button>
  )
}

export default Button

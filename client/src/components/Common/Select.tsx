import { PropsWithChildren } from "react"

import "./styles.scss"

type Props = {
  name: string
  style?: object
}

const Select = ({ name, style, children }: PropsWithChildren<Props>) => {
  return (
    <select className="select" name={name} style={style}>
      {children}
    </select>
  )
}

export default Select

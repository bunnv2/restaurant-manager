import { PropsWithChildren } from "react"

import "./styles.scss"

type Props = {
  align?: "center" | "right"
}

const Text = ({ align, children }: PropsWithChildren<Props>) => {
  return <div className={`text -${align}`}>{children}</div>
}

export default Text

import cx from "classnames"
import { Field } from "formik"

import "./styles.scss"

type Props = {
  name: string
  placeholder?: string
  outlined?: boolean
  style?: object
}

const Input = ({ name, placeholder, outlined, style }: Props) => {
  const inputClasses = cx("input", {
    "-outlined": outlined,
  })

  return (
    <Field
      className={inputClasses}
      name={name}
      placeholder={placeholder}
      style={style}
    />
  )
}

export default Input

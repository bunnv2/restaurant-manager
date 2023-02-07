import cx from "classnames"
import { Field } from "formik"

import "./styles.scss"

type Props = {
  name: string
  placeholder?: string
  outlined?: boolean
}

const Input = ({ name, placeholder, outlined }: Props) => {
  const inputClasses = cx("input", {
    "-outlined": outlined,
  })

  return (
    <Field
      className={inputClasses}
      name={name}
      placeholder={placeholder}
    />
  )
}

export default Input

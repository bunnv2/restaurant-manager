import { Field } from "formik"
import { PropsWithChildren } from "react"

import './styles.scss'

type Props = {
  name: string,
  style?: object
}

const CustomSelectField = ({ name, style, children }: PropsWithChildren<Props>) => {
  return (
    <Field as="select" className="select" name={name} style={style}>
      {children}
    </Field>
  )
}

export default CustomSelectField

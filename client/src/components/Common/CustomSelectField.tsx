import { Field } from "formik"
import { PropsWithChildren } from "react"

import './styles.scss'

type Props = {
  name: string,
}

const CustomSelectField = ({ name, children }: PropsWithChildren<Props>) => {
  return (
    <Field as="select" className="select" name={name}>
      {children}
    </Field>
  )
}

export default CustomSelectField

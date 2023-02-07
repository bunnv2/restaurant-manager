import cx from "classnames"

import './styles.scss'

type Props = {
  type: string
  name: string
  placeholder?: string
  outlined?: boolean
  autocomplete?: "off"
}

const Input = ({ type, name, placeholder, outlined, autocomplete }: Props) => {
  const inputClasses = cx("input", {
    "-outlined": outlined,
  })

  return (
    <input
      className={inputClasses}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autocomplete}
    />
  )
}

export default Input

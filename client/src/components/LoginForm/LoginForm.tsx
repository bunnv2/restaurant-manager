import { useNavigate } from "react-router-dom"
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

import { Button, Header, Text, CustomField } from "components"

import { useAuthContext } from "contexts"
import { signIn } from "utils"

import "./styles.scss"

type Props = {
  changeView: () => void
}

type FormFieldType = {
  name: string
  password: string
}

const LoginForm = ({ changeView }: Props) => {
  const navigate = useNavigate()
  const { setSignedIn } = useAuthContext()

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .required("Field required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  })

  const initialValues = {
    name: "",
    password: "",
  }

  const onSubmit = async (
    values: FormFieldType,
    { resetForm }: FormikHelpers<FormFieldType>
  ): Promise<void> => {
    const response = await signIn(values)
    const { data } = response

    if (!data) {
      toast.error("⛔ Failed to log in, please try again!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      setSignedIn(true)
      resetForm()
      navigate("/app/tables")
    }
  }

  return (
    <div className="login">
      <div className="login__text">
        <Header variant="h3">Welcome to Restaurant Manager!</Header>
        <Text align="center">Please Login</Text>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="login__form">
          <div className="login__fields">
            <CustomField name="name" placeholder="Company Name" />
            <ErrorMessage name="name">
              {(msg) => <div className="login__error">{msg}</div>}
            </ErrorMessage>
            <CustomField name="password" placeholder="Password" />
            <ErrorMessage name="password">
              {(msg) => <div className="login__error">{msg}</div>}
            </ErrorMessage>
          </div>
          <span className="login__link">
            New client?{" "}
            <Button type="button" link onClick={changeView}>
              Register
            </Button>
          </span>
          <Button
            style={{ marginTop: "16px" }}
            type="submit"
            withIcon
            rounded
          />
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm

import { Formik, Form, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

import { Button, CustomField, CustomSelectField, Header, Text } from "components"

import { signUp } from "utils"

import "./styles.scss"

type Props = {
  changeView: () => void
}

type FormFieldType = {
  name: string
  address: string
  city: string
  phone: string
  foodType: string
  password: string
}

const RegisterForm = ({ changeView }: Props) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .required("Field required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(
        /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/g,
        "Use correct pattern: xxx xxx xxx"
      )
      .required("Phone is required"),
    foodType: Yup.mixed()
      .oneOf(["italian", "american", "european", "asian", "polish", "mixed"], "Please choose one from below options")
      .required("Food type is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  })

  const initialValues = {
    name: "",
    address: "",
    city: "",
    phone: "",
    foodType: "",
    password: "",
  }

  const onSubmit = async (
    values: FormFieldType,
    { resetForm }: FormikHelpers<FormFieldType>
  ): Promise<void> => {
    const { data, statusText } = await signUp(values)

    if (!data) {
      toast.error("⛔ Failed to register, please try again!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      toast("✅ Registered successfully, you can log in now!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    }
    resetForm()
    changeView()
  }

  return (
    <div className="register">
      <div className="register__text">
        <Header variant="h3">Welcome to Restaurant Manager!</Header>
        <Text align="center">Please Register</Text>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="register__form">
          <div className="register__fields">
            <CustomField name="name" placeholder="Company Name" />
            <ErrorMessage name="name">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
            <CustomField name="address" placeholder="Company Address" />
            <ErrorMessage name="address">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
            <CustomField name="city" placeholder="Company City" />
            <ErrorMessage name="city">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
            <CustomField name="phone" placeholder="Company Phone" />
            <ErrorMessage name="phone">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
            <CustomSelectField name="foodType">
              <option value="none">-------</option>
              <option value="italian">Italian</option>
              <option value="american">American</option>
              <option value="european">European</option>
              <option value="asian">Asian</option>
              <option value="polish">Polish</option>
              <option value="mixed">Mixed</option>
            </CustomSelectField>
            <ErrorMessage name="foodType">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
            <CustomField name="password" placeholder="Password" />
            <ErrorMessage name="password">
              {(msg) => <div className="register__error">{msg}</div>}
            </ErrorMessage>
          </div>
          <span className="register__link">
            Already have account?{" "}
            <Button type="button" link onClick={changeView}>
              Login
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

export default RegisterForm

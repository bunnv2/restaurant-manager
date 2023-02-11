import { ErrorMessage, FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { Button, CustomSelectField, Header } from "components"

import { getMeals, addReceipt } from "utils"

import "./styles.scss"

type Props = {
  tableNumber: number
  refetch: () => void
  close: () => void
}

type FormFieldType = {
  meals: Array<any>
}

type MealType = {
  mealName: string
  description: string
  price: number
}

const AddReceipt = ({ tableNumber, refetch, close }: Props) => {
  const [meals, setMeals] = useState<Array<MealType>>([])

  useEffect(() => {
    const fetchMeals = async () => {
      const { data } = await getMeals()

      if (data.length > 0) {
        setMeals(data)
      } else {
        toast.error("⛔ No meals yet, add some in Settings tab!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        })
      }
    }

    fetchMeals()
  }, [])

  const initialValues = {
    meals: [{ mealName: "" }],
  }

  const validationSchema = Yup.object().shape({
    meals: Yup.array()
      .of(
        Yup.object().shape({
          mealName: Yup.string().required("Required"),
        })
      )
      .required("Must have at leats one table"),
  })

  const onSubmit = async (values: FormFieldType): Promise<void> => {
    const actualMeals = values.meals.map((meal) => {
      const actualMeal = meals.find((item) => item.mealName === meal.mealName)

      return actualMeal
    })

    const queryData = {
      tableNumber,
      meals: actualMeals as Array<MealType>,
    }
    const { data, statusText } = await addReceipt(queryData)

    if (!data) {
      toast.error("⛔ Failed to add receipt, please try again!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      toast(`✅ ${data.message}` || "✅ Receipt added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })

      close()
      refetch()
    }
  }

  return (
    <div className="add-receipt">
      <Header variant="h3">Order</Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="add-receipt__form">
            <FieldArray
              name="meals"
              render={({ push }) => (
                <div className="add-receipt__field-array">
                  {values.meals.map((_, index) => (
                    <div className="add-table__field" key={index}>
                      <span className="add-table__field-number">
                        {index + 1}.
                      </span>
                      <CustomSelectField
                        name={`meals[${index}].mealName`}
                        style={{
                          padding: "4px 8px",
                          textAlign: "center",
                          maxWidth: "80%",
                        }}
                      >
                        <option value="none">-------</option>
                        {meals.map(({ mealName }, index) => (
                          <option key={index} value={mealName}>
                            {mealName}
                          </option>
                        ))}
                      </CustomSelectField>
                      <ErrorMessage name={`meals[${index}].mealName`}>
                        {(msg) => msg}
                      </ErrorMessage>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => push({ capacity: "" })}
                    style={{ width: "fit-content" }}
                  >
                    Add meal
                  </Button>
                </div>
              )}
            />
            <Button type="submit">Confirm order</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddReceipt

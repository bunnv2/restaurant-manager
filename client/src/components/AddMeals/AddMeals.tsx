import { useEffect, useState } from "react"
import { Formik, Form, FieldArray } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

import { Button, CustomField } from "components"

import { addMeals, getMeals } from "utils"

import "./styles.scss"

type FormFieldType = {
  meals: Array<any>
}

type ResponseMealProps = {
  mealName: string
  description: string
  price: number
}

const AddMeals = () => {
  const [initialData, setInitialData] = useState<Array<ResponseMealProps>>([])

  useEffect(() => {
    const fetchMeals = async () => {
      const { data } = await getMeals()

      if (data.length > 0) {
        setInitialData(data)
      } else {
        toast.error("⛔ No meals yet, add some!", {
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

  const initialDataTransormed = initialData.map((item) => {
    const { mealName, description, price } = item
    return {
      name: mealName,
      description,
      price,
    }
  })

  const initialValues = {
    meals: initialDataTransormed || [{ name: "", description: "", price: "" }],
  }

  const validationSchema = Yup.object().shape({
    meals: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          description: Yup.string()
            .max(25, "Too long description")
            .required("Required"),
          price: Yup.number().required("Required"),
        })
      )
      .required("Must have at leats one meal"),
  })

  const onSubmit = async (values: FormFieldType): Promise<void> => {
    const { data } = await addMeals(values)

    if (!data) {
      toast.error("⛔ Failed to add meal, plese try again!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      toast(`✅ ${data.message}` || "✅ Meals added!", {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form className="add-meal">
          <FieldArray
            name="meals"
            render={({ push }) => (
              <div className="add-meal__field-array">
                {values.meals.map((_, index) => (
                  <div className="add-meal__field" key={index}>
                    <span className="add-meal__field-number">{index + 1}.</span>
                    <div className="add-meal">
                      <CustomField
                        name={`meals[${index}].name`}
                        placeholder="Name"
                        style={{ padding: "4px 8px", textAlign: "center" }}
                      />
                      <CustomField
                        name={`meals[${index}].description`}
                        placeholder="Description"
                        style={{ padding: "4px 8px", textAlign: "center" }}
                      />
                      <CustomField
                        name={`meals[${index}].price`}
                        placeholder="Price (number)"
                        style={{ padding: "4px 8px", textAlign: "center" }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => push({ name: "", description: "", price: "" })}
                  style={{ width: "fit-content" }}
                >
                  Add meal
                </Button>
              </div>
            )}
          />
          <Button type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AddMeals

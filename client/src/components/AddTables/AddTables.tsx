import { useEffect, useState } from "react"
import { Formik, Form, FieldArray } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

import { Button, CustomField } from "components"

import { addTables, getTables } from "utils"

import "./styles.scss"

type FormFieldType = {
  tables: Array<any>
}

type ResponseTableProps = {
  number: number
  capacity: string
  isOccupied: boolean
}

const AddTables = () => {
  const [initialData, setInitialData] = useState<Array<ResponseTableProps>>([])

  useEffect(() => {
    const fetchTables = async () => {
      const { data } = await getTables()

      if (data.length > 0) {
        setInitialData(data)
      } else {
        toast.error("⛔ No tables yet, add some!", {
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

    fetchTables()
  }, [])

  const initialDataTransormed = initialData.map((item) => {
    return { capacity: Number(item.capacity) }
  })

  const initialValues = {
    tables: initialDataTransormed || [{ capacity: "" }],
  }

  const validationSchema = Yup.object().shape({
    tables: Yup.array()
      .of(
        Yup.object().shape({
          capacity: Yup.number().required("Required"),
        })
      )
      .required("Must have at leats one table"),
  })

  const onSubmit = async (
    values: FormFieldType,
  ): Promise<void> => {
    const { data } = await addTables(values)

    if (!data) {
      toast.error("⛔ Failed to add tables, please try again!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
    } else {
      toast(`✅ ${data.message}` || "✅ Tables added!", {
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
        <Form className="add-table">
          <FieldArray
            name="tables"
            render={({ push }) => (
              <div className="add-table__field-array">
                {values.tables.map((_, index) => (
                  <div className="add-table__field" key={index}>
                    <span className="add-table__field-number">
                      {index + 1}.
                    </span>
                    <CustomField
                      name={`tables[${index}].capacity`}
                      placeholder="Capacity (number)"
                      style={{ padding: "4px 8px", textAlign: "center" }}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => push({ capacity: "" })}
                  style={{ width: "fit-content" }}
                >
                  Add table
                </Button>
              </div>
            )}
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}

export default AddTables

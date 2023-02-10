import { AxiosResponse } from "axios"
import { api } from "./api"

type SignInProps = {
  name: string
  password: string
}

type SignUpProps = {
  name: string
  password: string
  address: string
  city: string
  foodType: string
  phone: string
}

type AddTablesProps = {
  tables: Array<any>
}

type AddMealsProps = {
  meals: Array<any>
}

export const signIn = async (values: SignInProps): Promise<AxiosResponse> => {
  const response = await api.post("login", values)

  return response
}

export const signUp = async (values: SignUpProps): Promise<AxiosResponse> => {
  const response = await api.post("register", values)

  return response
}

export const addTables = async (
  values: AddTablesProps
): Promise<AxiosResponse> => {
  const tablesTransformed = values.tables.map((item, index) => {
    return { [index + 1]: Number(item.capacity) }
  })

  const queryData = {
    tables: tablesTransformed,
  }

  const response = await api.post("add-tables", queryData)

  return response
}

export const getTables = async (): Promise<AxiosResponse> => {
  const response = await api.get("get-tables")

  return response
}

export const addMeals = async (values: AddMealsProps): Promise<AxiosResponse> => {
  const tablesTransformed = values.meals.map((item) => {
    const { name, description, price } = item

    return {
      mealName: name,
      description,
      price: Number(price),
    }
  })

  const queryData = {
    meals: tablesTransformed,
  }

  const response = await api.post("add-meals", queryData)

  return response
}

export const getMeals = async (): Promise<AxiosResponse> => {
  const response = await api.get("get-meals")
  return response
}

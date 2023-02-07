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

export const signIn = async (values: SignInProps): Promise<any> => {
  const response = await api.post("login", values)

  return response
}

export const signUp = async (values: SignUpProps): Promise<AxiosResponse> => {
  const response = await api.post("register", values)

  return response
}

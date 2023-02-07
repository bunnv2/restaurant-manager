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

export const signIn = async (values: SignInProps): Promise<void> => {
  try {
    const response = await api.post("login", values)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const signUp = async (values: SignUpProps): Promise<void> => {
  try {
    const response = await api.post("register", values)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

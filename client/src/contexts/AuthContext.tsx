import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react"

type ContextProps = {
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

const initialValues = {
  token: "",
  setToken: () => {},
}

export const AuthContext = createContext<ContextProps>(initialValues)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string>("")

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

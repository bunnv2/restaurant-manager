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
  signedIn: boolean
  setSignedIn: Dispatch<SetStateAction<boolean>>
}

const initialValues = {
  signedIn: false,
  setSignedIn: () => {},
}

export const AuthContext = createContext<ContextProps>(initialValues)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

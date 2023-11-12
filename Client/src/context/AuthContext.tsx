/* eslint-disable @typescript-eslint/object-curly-spacing */
import React, {createContext, useEffect, useState} from 'react'

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  userData: UserData | null
  setUserData: (userData: UserData | null) => void
}

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: string
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  userData: null,
  setUserData: () => {}
})

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const updateUserData = () => {
      if (token != null) {
        const payload = JSON.parse(
          window.atob(token?.split('.')[1])
        ) as UserData
        setUserData(payload)
      } else {
        setUserData(null)
      }
    }

    updateUserData()
  }, [token])

  return (
    <AuthContext.Provider value={{token, setToken, userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}

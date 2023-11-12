/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

interface ProtectedRouteProps {
  path: string
  element: React.ReactNode
  allowedUserType: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedUserType
}) => {
  const authContext = useContext(AuthContext)
  const firstName = authContext.userData?.firstName
  const userTypeResponse = authContext.userData?.userTypeResponse
  const allowedUserTypeLower = allowedUserType.toLowerCase()

  // if the logged in user is equal to allowedUserType then let it pass else error page

  if (userTypeResponse === allowedUserTypeLower) {
    return element as React.ReactElement
  } else {
    console.log('User type ' + userTypeResponse)
    console.log('Firest type ' + firstName)
    return <Navigate to="/unauthorized" replace />
  }
}

export default ProtectedRoute

/* eslint-disable @typescript-eslint/object-curly-spacing */
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

const HeadNurse = (): JSX.Element => {
  const authContext = useContext(AuthContext)
  const firstName = authContext.userData?.firstName

  return (
    <>
      <div>
        Head Nurse Page
        <h1>Welcome {firstName}</h1>
      </div>
    </>
  )
}

export default HeadNurse

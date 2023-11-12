/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useContext, useState} from 'react'
import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import {message} from 'antd'
import './css/login.css'
import {AuthContext} from '../../context/AuthContext'
// interface LoginResponse {
//   redirect: string
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error] = useState('')

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onLogin = async () => {
    const credentials = {
      email,
      password
    }

    if (email === '' || password === '') {
      void message.error('Fill in details')
    } else {
      await axios
        .post('http://localhost:8000/api/user/login', credentials)
        .then((response) => {
          console.log(response)
          const {token} = response.data
          localStorage.setItem('token', token)

          const userTypeResponse = response.data.user.userType
            .toLowerCase()
            .replace(/\s+/g, '')
          console.log(userTypeResponse)

          const firstName = response.data.user.firstName
          const lastName = response.data.user.lastName

          void message.success('Login successful')

          void message.success('Welcome ' + firstName + ' ' + lastName)

          if (userTypeResponse === 'admin') {
            navigate('/admin')
          } else if (userTypeResponse === 'doctor') {
            navigate('/doctor-page')
          } else if (userTypeResponse === 'nurse') {
            navigate('/nurse-page')
          } else if (userTypeResponse === 'headnurse') {
            navigate('/list')
          }
        })
        .catch((error) => {
          console.log(error)
          void message.error('Email or Password is incorrect')
        })
    }
  }

  return (
    <div className="login-form-border">
      <div className="logo">
        <img
          width={50}
          src="https://www.huntingtonhealth.org/wp-content/uploads/2021/12/cropped-HH-favicon-2021.png"
          style={{marginLeft: '47%'}}
        />
      </div>

      <h1>Staff Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          <input
            className="email-input"
            placeholder="Enter Email Address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {error.length > 0 && <div style={{color: 'red'}}>{error}</div>}
        <button onClick={onLogin} className="login-btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

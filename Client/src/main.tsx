/* eslint-disable @typescript-eslint/object-curly-spacing */
import React from 'react'
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line @typescript-eslint/object-curly-spacing
import {RouterProvider} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import router from './Routes/UserManagementRoutes/Routers'
import {AuthProvider} from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2B3467'
        }
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
)

/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Layout} from 'antd'
import React from 'react'
import {Outlet} from 'react-router-dom'

const {Content} = Layout

const AppContent = (): JSX.Element => {
  return (
    <>
      <Content style={{padding: '20px'}}>
        <Outlet />
      </Content>
    </>
  )
}

export default AppContent

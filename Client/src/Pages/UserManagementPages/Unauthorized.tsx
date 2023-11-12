/* eslint-disable @typescript-eslint/object-curly-spacing */
import React from 'react'
import {Result} from 'antd'

const UnauthorizedPage: React.FC = () => {
  return (
    <div>
      <Result
        status="403"
        title="Unauthorized Access"
        subTitle="You are not authorized to access this page."
      />
    </div>
  )
}

export default UnauthorizedPage

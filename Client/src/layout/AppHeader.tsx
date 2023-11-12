/* eslint-disable @typescript-eslint/object-curly-spacing */
import React, {useContext} from 'react'

import {Button, Layout} from 'antd'
import Settings from '../Components/UserManagementComponents/settingsBtn'
import {
  MenuFoldOutlined,
  UserAddOutlined,
  ToolOutlined,
  OrderedListOutlined
} from '@ant-design/icons'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
interface IProps {
  onCollapsed: () => void
}

const {Header} = Layout

const AppHeader = ({onCollapsed}: IProps) => {
  const {userData} = useContext(AuthContext)
  const {userType} = userData ?? {}

  console.log(userType)

  const navigate = useNavigate()

  const handlEquipment = () => {
    navigate('/eqlist')
  }

  const handleAccount = () => {
    navigate('/add-patient')
  }

  const handleList = () => {
    navigate('/list')
  }

  if (userType == 'Admin') {
    return (
      <Header>
        <img
          width={30}
          src="https://www.huntingtonhealth.org/wp-content/uploads/2021/12/cropped-HH-favicon-2021.png"
          style={{marginLeft: '49%', marginRight: '45%'}}
        />
        <Settings />
      </Header>
    )
  } else if (userType == 'Head Nurse') {
    return (
      <Header>
        <img
          width={30}
          src="https://www.huntingtonhealth.org/wp-content/uploads/2021/12/cropped-HH-favicon-2021.png"
          style={{marginLeft: '49%', marginRight: '37%'}}
        />
        <Settings />
        <Button
          style={{marginLeft: '1%'}}
          icon={<OrderedListOutlined />}
          onClick={handleList}
        ></Button>

        <Button
          style={{marginLeft: '1%'}}
          icon={<UserAddOutlined />}
          onClick={handleAccount}
        ></Button>
        <Button
          style={{marginLeft: '1%'}}
          icon={<ToolOutlined />}
          onClick={handlEquipment}
        ></Button>
      </Header>
    )
  } else if (userType == 'Nurse') {
    return (
      <Header>
        <Button
          icon={<MenuFoldOutlined />}
          onClick={() => {
            onCollapsed()
          }}
        ></Button>

        <img
          width={30}
          src="https://www.huntingtonhealth.org/wp-content/uploads/2021/12/cropped-HH-favicon-2021.png"
          style={{marginLeft: '45%', marginRight: '37%'}}
        />
        <Settings />
        <Button
          style={{marginLeft: '1%'}}
          icon={<OrderedListOutlined />}
          onClick={handleList}
        ></Button>

        <Button
          style={{marginLeft: '1%'}}
          icon={<UserAddOutlined />}
          onClick={handleAccount}
        ></Button>
      </Header>
    )
  } else {
    return (
      <Header>
        <img
          width={30}
          src="https://www.huntingtonhealth.org/wp-content/uploads/2021/12/cropped-HH-favicon-2021.png"
          style={{marginLeft: '49%', marginRight: '47%'}}
        />
      </Header>
    )
  }
}

export default AppHeader

import React from 'react'
import { Layout, Menu } from 'antd'
import {
  BookOutlined,
  ClockCircleOutlined,
  ContainerOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  UserOutlined
} from '@ant-design/icons'

interface IProps {
  isCollapsed: boolean
}

const { Sider } = Layout

const menuItems = [
  {
    key: 'home',
    label: 'Home',
    icon: <HomeOutlined />
  },
  {
    key: 'lists',
    label: 'Lists',
    icon: <BookOutlined />,
    children: [
      {
        key: 'waitingList',
        label: 'Waiting List',
        icon: <ClockCircleOutlined />
      },
      {
        key: 'admissionList',
        label: 'Admission List',
        icon: <ContainerOutlined />
      },
      {
        key: 'surgeryList',
        label: 'Surgery List',
        icon: <MedicineBoxOutlined />
      }
    ]
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserOutlined />
  }
]

const AppSider = ({ isCollapsed }: IProps): JSX.Element => {
  return (
    <Sider theme="light" collapsed={isCollapsed}>
      <Menu items={menuItems} />
    </Sider>
  )
}

export default AppSider

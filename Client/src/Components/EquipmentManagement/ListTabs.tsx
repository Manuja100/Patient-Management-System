import React from 'react'
import {Tabs} from 'antd'
import type {TabsProps} from 'antd'
import EquipmentList from '../../Pages/EquipmentManagement/EqList'
import DeletedList from '../../Pages/EquipmentManagement/DeletedList'

const onChange = (key: string): void => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: 'Equipment List',
    label: 'Equipment List',
    children: <EquipmentList />
  },
  {
    key: 'Deleted List',
    label: 'Deleted List',
    children: <DeletedList />
  }
]

const EqListTabs: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
)

export default EqListTabs

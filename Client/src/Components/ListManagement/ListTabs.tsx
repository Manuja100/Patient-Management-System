import React from 'react'
import {Tabs} from 'antd'
import type {TabsProps} from 'antd'
import WaitingList from '../../Pages/ListManagement/WaitingLists'
import AdmissionList from '../../Pages/ListManagement/AdmissionList'
import ReAdmissionList from '../../Pages/ListManagement/Re-Admission List'
import SurgeryList from '../../Pages/ListManagement/Surgery List'
import CompleteList from '../../Pages/ListManagement/CompleteList'
import DiseasedList from '../../Pages/PatientManagement/DeceasedList'

const onChange = (key: string): void => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: 'Waiting List',
    label: 'Waiting List',
    children: <WaitingList />
  },
  {
    key: 'Admission List',
    label: 'Admission List',
    children: <AdmissionList />
  },
  {
    key: 'Surgery List',
    label: 'Surgery List',
    children: <SurgeryList />
  },
  {
    key: 'Complete List',
    label: 'Complete List',
    children: <CompleteList />
  },
  {
    key: 'Re-Admission List',
    label: 'Re-Admission List',
    children: <ReAdmissionList />
  },
  {
    key: 'Diseased List',
    label: 'Diseased List',
    children: <DiseasedList />
  }
]

const ListTabs: React.FC = () => (
  <>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </>
)

export default ListTabs

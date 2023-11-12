import {ExclamationCircleTwoTone} from '@ant-design/icons'
import {Button, Modal, Popover, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'
import EditAdmissionForm from './EditAdmissionForm'
import ListPopUp from './ListPopUp'
import AssignNurseForm from './AssignNurseForm'

interface AdmissionPopupProps {
  waitingListId: any
}

const AssignPatientPopup = ({
  waitingListId
}: AdmissionPopupProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Space>
        <Button
          type="default"
          onClick={() => {
            setOpen(true)
          }}
          style={{margin: '10%'}}
        >
          Assign
        </Button>
      </Space>
      <Modal
        title="Edit Admission Details"
        centered
        open={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        footer={null}
        width={500}
      >
        <AssignNurseForm waitingListId={waitingListId} />
      </Modal>
    </>
  )
}
export default AssignPatientPopup

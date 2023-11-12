import {ExclamationCircleTwoTone} from '@ant-design/icons'
import {Button, Modal, Popover, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'
import EditAdmissionForm from './EditAdmissionForm'
import ListPopUp from './ListPopUp'

interface AdmissionPopupProps {
  admissionListId: any
  waitingListId: any
}

const deleteRecord = (id: string): void => {
  console.log(id)

  axios
    .delete(`http://localhost:8000/list/${id}`)
    .then((response) => {
      console.log(response)
      void message.success('Patient updated successfully')
    })
    .catch((error) => {
      console.error(error)
      void message.success('Patient not updated successfully')
    })
}

const confirmTransfer = async (id: string, status: string): Promise<void> => {
  console.log('heyooo')
  console.log(id)
  console.log(status)
  try {
    await axios.put(`http://localhost:8000/list/${id}/${status}`)
    void message.success('Patient updated successfully')
  } catch (error) {
    console.error(error)
    void message.error('Failed to update patient')
  }
}

const AdmissionPopup = ({
  admissionListId,
  waitingListId
}: AdmissionPopupProps): JSX.Element => {
  const content = (
    <>
      <p>Take the patient back to the Waiting List</p>
      <Button
        onClick={() => {
          deleteRecord(admissionListId)
        }}
      >
        Take Back
      </Button>
      <hr />
      <p>Send Patient to Re - Admission List</p>
      <Button
        onClick={() => {
          void confirmTransfer(waitingListId, 'readmission')
        }}
      >
        Send
      </Button>
    </>
  )
  const [open, setOpen] = useState(false)
  return (
    <>
      <Space>
        <ListPopUp waitingListId={waitingListId} nextState={'surgery'} />
        <Button
          type="default"
          onClick={() => {
            setOpen(true)
          }}
        >
          Edit
        </Button>
        <Popover content={content} title="Restore Patient">
          <Button
            type="ghost"
            shape="circle"
            icon={<ExclamationCircleTwoTone />}
          ></Button>
        </Popover>
      </Space>
      <Modal
        title="Assign nurse to patient"
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
        <EditAdmissionForm admissionListId={admissionListId} />
      </Modal>
    </>
  )
}
export default AdmissionPopup

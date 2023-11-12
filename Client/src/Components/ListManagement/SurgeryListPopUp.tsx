import {ExclamationCircleTwoTone} from '@ant-design/icons'
import {Button, Modal, Popover, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'

interface ListPopUpProps {
  waitingListId: any
  prvStatus: string
  nextState: string
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

const SurgeryListPopUp = ({
  waitingListId,
  nextState,
  prvStatus
}: ListPopUpProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  const content = (
    <>
      <p>Take the patient back to the Waiting List</p>
      <Button
        onClick={() => {
          void confirmTransfer(waitingListId, prvStatus)
        }}
      >
        Take Back
      </Button>
    </>
  )
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true)
          }}
        >
          Next
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
        title="Send patient to next stage"
        centered
        open={open}
        onOk={() => {
          void confirmTransfer(waitingListId, nextState)
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={500}
      ></Modal>
    </>
  )
}
export default SurgeryListPopUp

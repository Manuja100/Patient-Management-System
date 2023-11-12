import { Button, Modal, Space, message } from 'antd'
import axios from 'axios'
import { useState } from 'react'

interface ListPopUpProps {
  waitingListId: any
  nextState: string
}

const confirmTransfer = async (id: string, status: string): Promise<void> => {
  try {
    await axios.put(`http://localhost:8000/list/${id}/${status}`)
    void message.success('Patient updated successfully')
  } catch (error) {
    console.error(error)
    void message.error('Failed to update patient')
  }
}

const TakeBackPopUp = ({
  waitingListId,
  nextState
}: ListPopUpProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true)
          }}
        >
          Take Back
        </Button>
      </Space>
      <Modal
        title="Take Back to Previous Stage"
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
export default TakeBackPopUp

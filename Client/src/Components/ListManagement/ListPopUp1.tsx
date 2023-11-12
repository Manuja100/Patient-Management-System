import {ExclamationCircleTwoTone} from '@ant-design/icons'
import {Button, Modal, Popover, Space, message, notification} from 'antd'
import axios from 'axios'
import React, {useState} from 'react'
import EditAdmissionForm from './ListManagement/EditAdmissionForm'

interface ListPopUpProps {
  waitingListId: any
  takeBackState: string
  nextState: string
}

const confirmTransfer = async (id: string, status: string): Promise<void> => {
  console.log(id)
  console.log(status)
  try {
    await axios.put(`http://localhost:8000/list/${id}/admission`)
    void message.success('Patient updated successfully')
  } catch (error) {
    console.error(error)
    void message.error('Failed to update patient')
  }
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
    })
}

const ListPopUp = (
  waitingListId: ListPopUpProps,
  takeBackState: ListPopUpProps,
  nextState: ListPopUpProps
): JSX.Element => {
  const objStr = JSON.stringify(waitingListId)
  const matchResult = objStr.match(/(?<="waitingListId":")[^"]+/)
  const id = matchResult != null ? matchResult[0] : ''
  const status = JSON.stringify(takeBackState)

  const content = (
    <>
      <p>Take the patient back to the Waiting List</p>
      <Button
        onClick={() => {
          deleteRecord(id)
        }}
      >
        Take Back
      </Button>
    </>
  )
  const [open, setOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (): void => {
    const key = `open${Date.now()}`
    const btn = (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => {
            api.destroy()
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            void confirmTransfer(id, status)
          }}
        >
          Confirm
        </Button>
      </Space>
    )
    api.open({
      placement: 'bottomRight',
      message: 'Move Patient',
      description: `Move Patient to ${status}.`,
      btn,
      key,
      onClose: close
    })
  }
  return (
    <>
      <Space>
        {contextHolder}
        <Button type="primary" onClick={openNotification}>
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
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={500}
      >
        <EditAdmissionForm admissionListId={id} />
      </Modal>
    </>
  )
}

export default ListPopUp

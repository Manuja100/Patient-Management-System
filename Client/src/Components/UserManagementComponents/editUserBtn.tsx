/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'
import EditUserForm from './editUserForm'

interface userData {
  userID: any
}

function redirectToRoute(route: string): void {
  window.location.href = route
}

const EditUserBtn = (userID: any): JSX.Element => {
  const objStr = JSON.stringify(userID)
  const matchResult = objStr.match(/(?<="userID":")[^"]+/)
  const id = matchResult != null ? matchResult[0] : ''
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
          Edit
        </Button>
      </Space>
      <Modal
        title="Edit User"
        centered
        open={open}
        width={500}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          redirectToRoute('/admin')
          setOpen(false)
        }}
        footer={null}
      >
        <EditUserForm userID={id} />
      </Modal>
    </>
  )
}
export default EditUserBtn

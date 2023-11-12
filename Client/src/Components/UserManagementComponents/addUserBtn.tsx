/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal, Space} from 'antd'
import {useState} from 'react'
import AddUserForm from './addUserForm'

function redirectToRoute(route: string): void {
  window.location.href = route
}

const AddUserBtn = (): JSX.Element => {
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
          Add User
        </Button>
      </Space>
      <Modal
        title="Add New User"
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
        <AddUserForm />
      </Modal>
    </>
  )
}
export default AddUserBtn

/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'
import AddUserForm from './addUserForm'
import ResetPasswordForm from './resetPassword'

// function redirectToRoute(route: string): void {
//   window.location.href = route
// }

const ChangePasswordBtn = (): JSX.Element => {
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
          Change Password
        </Button>
      </Space>
      <Modal
        title="Change Password"
        centered
        open={open}
        width={500}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        footer={null}
      >
        <ResetPasswordForm />
      </Modal>
    </>
  )
}
export default ChangePasswordBtn

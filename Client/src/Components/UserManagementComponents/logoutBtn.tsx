/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal, Space, message} from 'antd'
import {useState} from 'react'

const LogoutBtn = (): JSX.Element => {
  const [visible, setVisible] = useState(false) // State to control the visibility of the confirmation modal

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    window.location.href = '/login'
    message.success('Have a nice day')
  }

  const showModal = (): void => {
    setVisible(true)
  }

  const handleCancel = (): void => {
    setVisible(false)
  }

  const handleConfirmLogout = (): void => {
    handleLogout()
    setVisible(false)
  }

  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          Log Out
        </Button>
      </Space>
      <Modal
        title="Confirm Logout"
        visible={visible}
        onCancel={handleCancel}
        width={300}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" onClick={handleConfirmLogout}>
            Logout
          </Button>
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  )
}

export default LogoutBtn

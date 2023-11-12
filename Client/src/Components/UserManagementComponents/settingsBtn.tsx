/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {ColumnsType} from 'antd/es/table'
import Table from 'antd/es/table'
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {SettingOutlined} from '@ant-design/icons'

// import PopUp from '../Components/PopUp'

import LogoutBtn from './logoutBtn'

import ResetPasswordBtn from './resetPasswordBtn'

import {Button, Modal, message} from 'antd'

const Settings = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = (): void => {
    setVisible(true)
  }

  const handleCancel = (): void => {
    setVisible(false)
  }

  return (
    <>
      <div className="logoutBtn">
        <Button onClick={showModal} icon={<SettingOutlined />}></Button>
        <Modal
          title="Settings"
          visible={visible}
          onCancel={handleCancel}
          width={500}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          ]}
        >
          <div className="logOutBtnInModel">
            <LogoutBtn />
          </div>

          <div className="changePasswordBtn">
            <ResetPasswordBtn />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Settings

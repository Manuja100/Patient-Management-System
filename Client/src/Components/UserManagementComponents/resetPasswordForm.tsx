/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Form, Input, Button, message} from 'antd'
import axios from 'axios'
// import {useContext} from 'react'
// import {AuthContext} from '../../context/AuthContext'

interface UserFormData {
  password: string
}

interface userData {
  userID: any
}

const EditUserForm = ({userID}: userData): JSX.Element => {
  const [form] = Form.useForm()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = async (values: UserFormData) => {
    try {
      await axios.post(`http://localhost:8080/update/${userID}`, values)
      void message.success('User updated successfully')
    } catch (error) {
      console.error(error)
      void message.error('Failed to update User')
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<UserFormData> onFinish={onSubmit} form={form}>
      <Form.Item<UserFormData> name="currentPassword" label="Current Password">
        <Input />
      </Form.Item>
      <Form.Item<UserFormData> name="newPassword" label="New Password">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditUserForm

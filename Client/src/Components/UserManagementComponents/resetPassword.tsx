/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Form, Input, Button, message} from 'antd'
import axios from 'axios'

interface ResetPasswordFormData {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ResetPasswordForm = (): JSX.Element => {
  const [form] = Form.useForm()

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      console.log(values.currentPassword)
      console.log(values.newPassword)
      if (values.newPassword !== values.confirmPassword) {
        void message.error('Passwords do not match')
        return
      }
      await axios.post('http://localhost:8000/resetPassword', values)
      void message.success('Password reset successful')
      form.resetFields()
    } catch (error) {
      console.error(error)
      void message.error('Failed to reset password')
    }
  }

  return (
    <Form<ResetPasswordFormData> onFinish={onSubmit} form={form}>
      <Form.Item<ResetPasswordFormData>
        name="email"
        label="Email Address"
        rules={[
          {required: true, message: 'Please enter your email address'},
          {type: 'email', message: 'Please enter a valid email address'}
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<ResetPasswordFormData>
        name="currentPassword"
        label="Current Password"
        rules={[{required: true, message: 'Please enter your new password'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<ResetPasswordFormData>
        name="newPassword"
        label="New Password"
        rules={[{required: true, message: 'Please enter your new password'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<ResetPasswordFormData>
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={['password']}
        rules={[
          {required: true, message: 'Please confirm your new password'},
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Passwords do not match'))
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ResetPasswordForm

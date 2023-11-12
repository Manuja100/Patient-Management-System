/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Form, Input, Button, message, Select} from 'antd'
import axios from 'axios'
import {useEffect} from 'react'

interface UserFormData {
  firstName: string
  lastName: string
  userType: string
  designation: string
  contactNumber: string
  email: string
  password: string
}

interface userData {
  userID: any
}

const EditUserForm = ({userID}: userData): JSX.Element => {
  const [form] = Form.useForm()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchUser = async () => {
      try {
        const responseSingleUser = await axios.get(
          `http://localhost:8000/SingleUser/${userID}`
        )
        const {data} = responseSingleUser

        form.setFieldsValue({
          firstName: data.firstName,
          lastName: data.lastName,
          userType: data.userType,
          designation: data.designation,
          contactNumber: data.contactNumber,
          email: data.email
        })
      } catch (error) {
        console.error(error)
        void message.error('Failed to fetch user data')
      }
    }
    void fetchUser()
  }, [userID, form])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = async (values: UserFormData) => {
    try {
      if (values.userType === 'Admin') {
        console.log(values.userType)
        void message.error('Can not edit admin user')
      } else {
        await axios.post(`http://localhost:8000/updateUser/${userID}`, values)
        void message.success('User updated successfully')
      }
    } catch (error) {
      console.error(error)
      void message.error('Failed to update User')
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<UserFormData> onFinish={onSubmit} form={form}>
      <Form.Item<UserFormData> name="firstName" label="First Name">
        <Input />
      </Form.Item>
      <Form.Item<UserFormData> name="lastName" label="Last Name">
        <Input />
      </Form.Item>
      <Form.Item<UserFormData> name="userType" label="User Type">
        <Select>
          <Select.Option value="Consultant">Consultant</Select.Option>
          <Select.Option value="Doctor">Doctor</Select.Option>
          <Select.Option value="Head Nurse">Head Nurse</Select.Option>
          <Select.Option value="Nurse">Nurse</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item<UserFormData> name="designation" label="Designation">
        <Input />
      </Form.Item>
      <Form.Item<UserFormData>
        name="contactNumber"
        label="Contact Number"
        rules={[
          {required: true, message: 'Please enter your contact number'},
          {
            pattern: /^[0-9]{10}$/,
            message: 'Contact number should be 10 digits'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<UserFormData>
        name="email"
        label="Email Address"
        rules={[
          {required: true, message: 'Please enter your email address'},
          {type: 'email', message: 'Please enter a valid email address'}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Edit User
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditUserForm

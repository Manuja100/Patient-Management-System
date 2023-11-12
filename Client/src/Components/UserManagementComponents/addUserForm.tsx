/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Form, Input, Button, Select, message} from 'antd'
import axios from 'axios'

interface UserFormData {
  firstName: string
  lastName: string
  userType: string
  designation: string
  contactNumber: string
  email: string
  password: string
}

interface UserCreateResponse {
  firstName: string
  lastName: string
  userType: string
  designation: string
  contactNumber: string
  email: string
  password: string
}

const AddUserForm = (): JSX.Element => {
  const onSubmit = async (values: UserFormData): Promise<void> => {
    console.log(values)

    const checkEmailExists = async (email: string): Promise<boolean> => {
      try {
        const {data} = await axios.get(
          `http://localhost:8000/checkEmail/${email}`
        )
        console.log(data)
        if (data.message === 'User Already Exists') {
          return true
        }
        return false
      } catch (error) {
        void message.error('Failed to check email')
        console.log(error)
        return false
      }
    }

    const email = values.email

    const emailExists = await checkEmailExists(email)

    try {
      if (emailExists) {
        console.log(emailExists)
        void message.error('Email already exists')
        return
      } else {
        const data = {...values}
        await axios.post<UserCreateResponse>(
          'http://localhost:8000/addUser',
          data
        )
        void message.success('User created successfully')
      }
    } catch (error) {
      void message.error('Failed to create User')
    }
  }

  //   const clearFormFields = (form: FormInstance): void => {
  //     const formFields = form.getFieldsValue()

  //     for (const key in formFields) {
  //       form.setFieldsValue({[key]: ''})
  //     }
  //   }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<UserFormData> onFinish={onSubmit}>
      <Form.Item<UserFormData>
        name="firstName"
        label="First Name"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item<UserFormData>
        name="lastName"
        label="Last Name"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item<UserFormData>
        name="userType"
        label="User Type"
        rules={[{required: true}]}
      >
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
      <Form.Item<UserFormData>
        name="password"
        label="Password"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
        {/* <Button
          type="default"
          onClick={() => {
            clearFormFields(Form)
          }}
        >
          Reset All Fields
        </Button> */}
      </Form.Item>
    </Form>
  )
}

export default AddUserForm

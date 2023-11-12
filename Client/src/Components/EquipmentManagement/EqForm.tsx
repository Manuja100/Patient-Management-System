import {Button, Form, Input, InputNumber, Select} from 'antd'
import axios, {type AxiosResponse} from 'axios'
import type {ColumnsType} from 'antd/es/table'

interface EqFormData {
  id: string
  Serial: number
  Equipment: string
  Type: string
  Page: number
  quantity: number
  location: string
}

interface EqCreateFormData {
  _id: React.Key
  Serial: number
  Equipment: string
  Type: string
  Page: number
  quantity: number
  location: string
}

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

function redirectToRoute(route: string): void {
  window.location.href = route
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min}'
  }
}

const {Option} = Select

const EqForm = (): JSX.Element => {
  const onSubmit = async (
    values: EqFormData
  ): Promise<AxiosResponse<EqCreateFormData>> => {
    return await axios.post<EqCreateFormData>(
      'http://localhost:8000/eqlist',
      values
    )
  }
  return (
    <>
      <Form<EqFormData>
        onFinish={onSubmit}
        {...layout}
        style={{maxWidth: 600}}
        //validateMessages={validateMessages}
      >
        <Form.Item<EqFormData>
          name="serialNo"
          label="Serial Number"
          rules={[{required: true, message: 'Please input Serial Number!'}]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<EqFormData>
          name="name"
          label="Equipment Name"
          rules={[{required: true, message: 'Please input Equipment Name!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Type"
          label="Select"
          hasFeedback
          rules={[{required: true, message: 'Please select Equipment Type!'}]}
        >
          <Select placeholder="Please select a Equipment Type">
            <Option value="Surgical Inv">Surgical Inv</Option>
            <Option value="Hardware">Hardware</Option>
            <Option value="Furniture">Furniture</Option>
            <Option value="Linent">Linent</Option>
          </Select>
        </Form.Item>

        <Form.Item<EqFormData>
          name="pageNo"
          label="Page Number"
          rules={[
            {
              type: 'number',
              min: 1,
              required: true,
              message: 'Please input valid Page Number!'
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<EqFormData>
          name="Quantity"
          label="Quantity"
          rules={[
            {
              type: 'number',
              min: 0,
              required: true,
              message: 'Please input valid Quantity!'
            }
          ]}
          // rules={[{type: 'number', min: 0, max: 1000000}]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<EqFormData>
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: 'Please input Location!'
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}></Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginLeft: '63%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EqForm

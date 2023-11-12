import {Button, Form, Input, InputNumber, message, Select} from 'antd'
import axios, {type AxiosResponse} from 'axios'
import type {ColumnsType} from 'antd/es/table'
import {useEffect} from 'react'

interface EqFormData {
  id: string
  serialNo: number
  eqName: string
  Type: string
  page: number
  Quantity: number
  Location: string
}

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
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

interface EquipmentFormProps {
  equipmentListId: any
}

const EqEditForm = ({equipmentListId}: EquipmentFormProps): JSX.Element => {
  const [form] = Form.useForm()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchUser = async () => {
      try {
        const responseSingleEquipment = await axios.get(
          `http://localhost:8000/SingleEquipment/${equipmentListId}`
        )
        const {data} = responseSingleEquipment
        console.log(data)

        form.setFieldsValue({
          name: data.name,
          Type: data.Type,
          pageNo: data.pageNo,
          Quantity: data.Quantity,
          location: data.location
        })
      } catch (error) {
        console.error(error)
        void message.error('Failed to fetch Equipment data')
      }
    }
    void fetchUser()
  }, [equipmentListId, form])

  const onSubmit = async (values: EqFormData) => {
    try {
      await axios.put(`http://localhost:8000/eqList/${equipmentListId}`, values)
      console.log
      void message.success('Equipment updated successfully')
    } catch (error) {
      console.error(error)
      void message.error('Failed to update Equipment')
    }
  }
  return (
    <Form<EqFormData>
      onFinish={onSubmit}
      form={form}
      {...layout}
      style={{maxWidth: 600}}
      validateMessages={validateMessages}
    >
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
        <Button type="primary" htmlType="submit" style={{marginLeft: '62%'}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EqEditForm

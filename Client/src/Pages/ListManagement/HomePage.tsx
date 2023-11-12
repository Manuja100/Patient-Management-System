import React, { useState } from 'react'
import { Form, Select, Button } from 'antd'
import axios from 'axios'

type SizeType = Parameters<typeof Form>[0]['size']

const Filter: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  )
  const [equipment, setEquipmet] = useState<string[]>([])

  const onFormLayoutChange = ({ size }: { size: SizeType }): void => {
    setComponentSize(size)
  }

  const handleGetRequest = (): void => {
    console.log(equipment)
    axios
      .get('http://localhost:8000/list/filter', {
        params: {
          Type: equipment
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSelectEquipment = (values: string[]): void => {
    setEquipmet(values)
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="inline"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ marginLeft: '10%', maxWidth: '100%' }}
    >
      <Form.Item style={{ width: '15%' }}>
        <Select mode="multiple" onChange={handleSelectEquipment}>
          <Select.Option value="Dr. Michael Lee">Dr. Michael Lee</Select.Option>
          <Select.Option value="Dr. David Jones">Dr. David Jones</Select.Option>
          <Select.Option value="Dr. Jane Smith">Dr. Jane Smith</Select.Option>
          <Select.Option value="Dr. Sarah Kim">Dr. Sarah Kim</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleGetRequest}>Filter List</Button>
      </Form.Item>
    </Form>
  )
}

export default Filter

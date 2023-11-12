import React from 'react'
import { Template } from '../../types/template.type'
import { FormikProps } from 'formik'
import { Form, Radio, Typography } from 'antd'

type GenderSelectorProps = {
  formik: FormikProps<Template>
  isDisabled: boolean
  error?: string
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  formik,
  isDisabled = false,
  error
}) => {
  return (
    <Form.Item
      label={<Typography.Text>Gender</Typography.Text>}
      validateStatus={error ? 'error' : ''}
      help={error ? error : ''}
    >
      <Radio.Group
        name="gender"
        onChange={formik.handleChange}
        value={formik.values.gender}
      >
        <Radio value="female" disabled={isDisabled}>
          Female
        </Radio>
        <Radio value="male" disabled={isDisabled}>
          Male
        </Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default GenderSelector

import React, {useState} from 'react'
import {FormikProps} from 'formik'
import {Template} from '../../types/template.type'
import {Form, Input, Select} from 'antd'

const {Option} = Select

type ConsultantSelectorProps = {
  label: string
  name: keyof Template
  formik: FormikProps<Template>
  consultant?: any[] // Update the type of consultant array if possible
  error?: string
  helperText?: string
  xs?: number
  isDisabled?: boolean
}

const ConsultantSelector: React.FC<ConsultantSelectorProps> = ({
  label,
  name,
  formik,
  consultant,
  error,
  helperText,
  xs = 18.5,
  isDisabled = false
}) => {
  console.log(formik.values[name])

  const handleChange = (value: any | null) => {
    formik.setFieldValue(name, value)
  }

  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={error ? 'error' : ''}
      help={error || helperText}
      wrapperCol={{span: xs}}
    >
      <Select
        defaultValue={formik.values[name]}
        onChange={handleChange}
        disabled={isDisabled}
        options={consultant?.map((item) => ({
          label: item.firstName + ' ' + item.lastName,
          value: item.firstName + ' ' + item.lastName
        }))}
      />
    </Form.Item>
  )
}

export default ConsultantSelector

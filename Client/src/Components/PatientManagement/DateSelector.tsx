import React, { useState } from 'react'
import { FormikProps } from 'formik'
import { Template } from '../../types/template.type'
import { DatePicker, Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

type DateSelectorProps = {
  formik: FormikProps<Template>
  label: string
  name: keyof Template

  isDisabled: boolean

  error?: string
}

const DateSelector: React.FC<DateSelectorProps> = ({
  formik,
  label,
  name,

  isDisabled = false,

  error
}) => {
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY/MM/DD')
      formik.setFieldValue(name, formattedDate)
    } else {
      formik.setFieldValue(name, '')
    }
  }
  const value = formik.values[name] ? dayjs(formik.values[name]) : undefined
  return (
    <Form.Item label={label} name={name} wrapperCol={{ span: 8 }}>
      <DatePicker
        // value={value}
        defaultValue={value}
        disabled={isDisabled}
        format="YYYY/MM/DD"
        onChange={handleDateChange}
      />
    </Form.Item>
  )
}

export default DateSelector

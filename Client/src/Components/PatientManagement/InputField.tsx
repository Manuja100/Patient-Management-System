import { FormikProps } from 'formik'
import { Template } from '../../types/template.type'
import { Typography, Input, Row, Col, Form } from 'antd'

type InputFieldProps = {
  label?: string
  name?: string
  formik?: FormikProps<Template>
  xs?: number
  error?: string
  helperText?: string
  value?: string
  isDisabled?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  formik,
  xs = 30,
  error,
  helperText,
  value,
  isDisabled = false
}) => {
  return (
    <Form.Item label={label} wrapperCol={{ span: xs }}>
      <Input
        disabled={isDisabled}
        placeholder={label}
        name={name}
        onChange={formik?.handleChange}
        value={value}
      />
      {error && (
        <Typography.Text type="danger" style={{ fontSize: 12 }}>
          {helperText}
        </Typography.Text>
      )}
    </Form.Item>
  )
}

export default InputField

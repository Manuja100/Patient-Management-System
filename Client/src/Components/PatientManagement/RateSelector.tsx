import React from 'react'
import {Template} from '../../types/template.type'
import {FormikProps} from 'formik'
import {Typography, Rate, Form} from 'antd'
import {StarFilled} from '@ant-design/icons'

type RatingProps = {
  label: string
  name: string
  formik: FormikProps<Template>
  xs?: number
  isDisabled?: boolean
}

const labels: {[index: string]: string} = {
  1: 'Non-urgent',
  2: 'Semi-urgent',
  3: 'Urgent',
  4: 'Emergent',
  5: 'Immediate'
}

const RateSelector: React.FC<RatingProps> = ({
  label,
  name,
  formik,
  xs = 8,
  isDisabled = false
}) => {
  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
  }

  return (
    <Form.Item label={label}>
      <Rate
        disabled={isDisabled}
        count={5}
        value={formik.values.starPriorityLevel}
        character={<StarFilled />}
        tooltips={Object.values(labels)}
        onChange={(value) => {
          formik.setFieldValue('starPriorityLevel', value)
          formik.setFieldValue('hover', value)
        }}
        onHoverChange={(value) => {
          formik.setFieldValue('hover', value)
        }}
      />
      {formik.values.starPriorityLevel !== null && (
        <Typography.Text style={{marginLeft: 8}}>
          {
            // labels[
            //   formik.values.hover !== 0
            //     ? formik.values.hover // Display the label for hover state if available
            //     : formik.values.priority // Otherwise, display the label for the selected priority
            // ]
            labels[formik.values.starPriorityLevel]
          }
        </Typography.Text>
      )}
    </Form.Item>
  )
}

export default RateSelector

import { Form, Input, DatePicker, Button, message } from 'antd'
import axios, { type AxiosResponse } from 'axios'
import { type Moment } from 'moment'

interface PatientFormData {
  admissionDate: Moment
  BHTNo: string
  clinicNo: string
  PHPNo: string
  gardien: string
  gardienContactNo: string
  waitingListId: React.Key
}

interface PatientCreateResponse {
  admissionDate: string
  BHTNo: string
  clinicNo: string
  PHPNo: string
  gardien: string
  gardienContactNo: string
  waitingListId: React.Key
}

interface AdmissionFormProps {
  waitingListId: any
}

const AdmissionForm = ({ waitingListId }: AdmissionFormProps): JSX.Element => {
  const objStr = JSON.stringify(waitingListId)
  const matchResult = objStr.match(/(?<="waitingListId":")[^"]+/)
  waitingListId = matchResult != null ? matchResult[0] : ''

  const onSubmit = async (
    values: PatientFormData
  ): Promise<AxiosResponse<PatientCreateResponse>> => {
    let success = false
    try {
      const data = { ...values, waitingListId }
      const response = await axios.post<PatientCreateResponse>(
        'http://localhost:8000/list',
        data
      )

      // Display success message only when the request is successful
      if (response.status === 200) {
        success = true
        void message.success('Successfully Added')
      }

      return response
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      if (!success) {
        void message.warning('Another Patient Has Been Assigned to That ID')
      }
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<PatientFormData> onFinish={onSubmit}>
      <Form.Item<PatientFormData> name="admissionDate" label="Admission Date">
        <DatePicker />
      </Form.Item>
      <Form.Item<PatientFormData> name="BHTNo" label="BHT No">
        <Input />
      </Form.Item>
      <Form.Item<PatientFormData> name="clinicNo" label="Clinic No">
        <Input />
      </Form.Item>
      <Form.Item<PatientFormData> name="PHPNo" label="PHP no">
        <Input />
      </Form.Item>
      <Form.Item<PatientFormData> name="gardien" label="Guardian">
        <Input />
      </Form.Item>
      <Form.Item<PatientFormData>
        name="gardienContactNo"
        label="gardienContactNo"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AdmissionForm

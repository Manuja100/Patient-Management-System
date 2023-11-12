import {Form, Input, DatePicker, Button, message, Select} from 'antd'
import axios, {type AxiosResponse} from 'axios'
import {type Moment} from 'moment'
import {useEffect, useState} from 'react'

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

const AssignNurseForm = ({waitingListId}: AdmissionFormProps): JSX.Element => {
  const objStr = JSON.stringify(waitingListId)
  const matchResult = objStr.match(/(?<="waitingListId":")[^"]+/)
  waitingListId = matchResult != null ? matchResult[0] : ''

  const onSubmit = async (
    values: PatientFormData
  ): Promise<AxiosResponse<PatientCreateResponse>> => {
    let success = false
    try {
      const data = {...values, waitingListId}
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

  const [nurseList, setNurse] = useState<string[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/getNurseList')
      .then(function (response) {
        setNurse(response.data.result[0].firstName)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  console.log(nurseList)

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<PatientFormData> onFinish={onSubmit}>
      <Form.Item<PatientFormData> name="assignNurse" label="Assign Nurse">
        <Form.Item style={{width: '50%'}}>
          <Select mode="multiple" placeholder="Select Nurse">
            {nurseList.map((firstName) => (
              <Select.Option key={firstName} value={firstName}>
                {firstName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AssignNurseForm

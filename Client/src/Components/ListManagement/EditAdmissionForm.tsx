import {Form, Input, Button, message} from 'antd'
import form from 'antd/es/form'
import axios from 'axios'
import {useEffect} from 'react'

interface PatientFormData {
  BHTNo: string
  clinicNo: string
  PHPNo: string
  gardien: string
  gardienContactNo: string
  waitingListId: React.Key
}

interface AdmissionFormProps {
  admissionListId: string
}

const EditAdmissionForm = ({
  admissionListId
}: AdmissionFormProps): JSX.Element => {
  const [form] = Form.useForm()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchUser = async () => {
      try {
        const responseSingleEquipment = await axios.get(
          `http://localhost:8000/editList/${admissionListId}`
        )
        const {data} = responseSingleEquipment
        console.log(data)

        form.setFieldsValue({
          BHTNo: data.BHTNo,
          clinicNo: data.clinicNo,
          PHPNo: data.PHPNo,
          gardien: data.gardien,
          gardienContactNo: data.gardienContactNo
        })
      } catch (error) {
        console.error(error)
        void message.error('Failed to fetch patient data')
      }
    }
    void fetchUser()
  }, [admissionListId, form])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = async (values: PatientFormData) => {
    try {
      await axios.put(`http://localhost:8000/list/${admissionListId}`, values)
      void message.success('Patient updated successfully')
    } catch (error) {
      console.error(error)
      void message.error('Failed to update patient')
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form<PatientFormData> onFinish={onSubmit} form={form}>
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

export default EditAdmissionForm

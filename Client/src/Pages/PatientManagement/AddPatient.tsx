import {Form, Button, Avatar, Row, Col, Spin, FormInstance} from 'antd'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import {PatientSchema} from '../../assets/ValidationSchema/PatientSchema'
import {Template} from '../../types/template.type'
import {
  InputField,
  RateSelector,
  GenderSelector,
  DateSelector,
  ConsultantSelector
} from '../../Components'
// import RateSelector from '../Components/RateSelector'
// import GenderSelector from '../Components/GenderSelector'
// import DateSelector from '../Components/DateSelector'
// import { Add, Update } from '@mui/icons-material'
import swal from 'sweetalert2'
// import ConsultantSelector from '../Components/ConsultantSelector'
import dayjs, {Dayjs} from 'dayjs'

type AddPatientProps = {
  isDisable?: boolean
  setIsDisable?: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setIsDecease?: React.Dispatch<React.SetStateAction<boolean>>
}

const valuesTemplate: Template = {
  serialNo: '',
  clinicRegNo: '',
  dateOfRegistration: '',
  name: '',
  dateOfBirth: '',
  NIC: '',
  address: '',
  district: '',
  contactNo: '',
  occupation: '',
  race: '',
  religion: '',
  gender: '',
  diagnosis: '',
  consultantResponsible: '',
  specialNotes: '',
  starPriorityLevel: 1,
  hover: -1
}

const AddPatient = ({
  isDisable = false,
  setIsDisable,
  id,
  isLoading,
  setIsDecease
}: AddPatientProps) => {
  const clickHandler = () => {
    console.log('first')
  }

  // const url = import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
  const url = 'http://localhost:8000'
  const navigate = useNavigate()
  const [data, setData] = useState<Template>()
  const [form] = Form.useForm()
  const [consultant, setConsultant] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const formRef = useRef<FormInstance>(null)

  const formik = useFormik({
    initialValues: data ?? valuesTemplate,
    validationSchema: PatientSchema,
    validateOnChange: false,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log(values)
      if (!id) {
        await axios({
          method: 'POST',
          url: `http://localhost:8000/patient/add`,
          data: values
        }).then((res) => {
          if (res.status == 200) {
            swal.fire('Success', 'Patient added successfully !', 'success')
            formik.resetForm()
            navigate('./')
            navigator
          } else {
            swal.fire('Error', 'Something went wrong !', 'error')
          }
        })
      } else {
        await axios({
          method: 'PUT',
          url: `http://localhost:8000/patient/update/${id}`,
          data: values
        }).then((res) => {
          if (res.status == 200) {
            swal.fire('Success', 'Patient updated successfully !', 'success')
            setData(res.data)
            setIsDisable ? setIsDisable(!isDisable) : ' '
            navigate('/list')
            navigator
          } else {
            swal.fire('Error', 'Something went wrong !', 'error')
          }
        })

        console.log(values)
      }
    }
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/consultant/all`,
      responseType: 'json'
    }).then((res) => {
      setConsultant(res.data)
    })
  }, [])

  useEffect(() => {
    if (isDisable || id) {
      axios({
        method: 'GET',
        url: `${url}/patient/${id}`,
        responseType: 'json'
      }).then(({data}: {data: any}) => {
        setIsDecease ? setIsDecease(data.isDeceased) : ''

        console.log(data.isDeceased)
        setData(data)

        formik.setFieldValue(
          'dateOfRegistration',
          dayjs(new Date(data.dateOfRegistration))
        )

        formik.setFieldValue('dateOfBirth', dayjs(new Date(data.dateOfBirth)))
        formik.setFieldValue(
          'consultantResponsible',
          data.consultantResponsible
        )
        setLoading(false)
        isLoading ? isLoading(false) : ''
      })
    } else {
      setLoading(false)
      isLoading ? isLoading(false) : ''
    }
  }, [])
  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    )

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  return (
    <Row justify="center" align="middle">
      <Col span={10}>
        <Form
          ref={formRef}
          onFinish={formik.handleSubmit}
          labelCol={{span: 7}}
          wrapperCol={{span: 16}}
          // form={form}
        >
          <Form.Item wrapperCol={{span: 16, offset: 7}}>
            <Row justify="center">
              <Avatar size={100} />
            </Row>
          </Form.Item>

          <InputField
            label="Full Name"
            isDisabled={isDisable}
            formik={formik}
            xs={18.5}
            name="name"
            error={formik.errors['name']}
            helperText={formik.errors['name']}
            value={formik.values.name}
          />

          <InputField
            label="NIC"
            isDisabled={isDisable}
            formik={formik}
            xs={18.5}
            name="NIC"
            error={formik.errors['NIC']}
            helperText={formik.errors['NIC']}
            value={formik.values.NIC}
          />

          <InputField
            isDisabled={isDisable}
            label="Serial Number"
            error={formik.errors['serialNo']}
            helperText={formik.errors['serialNo']}
            formik={formik}
            name="serialNo"
            value={formik.values.serialNo}
          />

          <InputField
            label="Clinic Registration Number"
            formik={formik}
            isDisabled={isDisable}
            name="clinicRegNo"
            error={formik.errors['clinicRegNo']}
            helperText={formik.errors['clinicRegNo']}
            value={formik.values.clinicRegNo}
          />

          <DateSelector
            label="Date of Registration"
            name="dateOfRegistration"
            isDisabled={isDisable}
            formik={formik}
          />

          <DateSelector
            isDisabled={isDisable}
            label="Date of Birth"
            name="dateOfBirth"
            formik={formik}
          />

          <ConsultantSelector
            label="Consultant Responsible"
            isDisabled={isDisable}
            formik={formik}
            name="consultantResponsible"
            error={formik.errors['consultantResponsible']}
            helperText={formik.errors['consultantResponsible']}
            consultant={consultant}
          />

          <GenderSelector
            error={formik.errors['gender']}
            formik={formik}
            isDisabled={isDisable}
          />

          <InputField
            isDisabled={isDisable}
            label="Address"
            formik={formik}
            xs={18.5}
            name="address"
            error={formik.errors['address']}
            helperText={formik.errors['address']}
            value={formik.values.address}
          />

          <InputField
            isDisabled={isDisable}
            label="Race"
            formik={formik}
            xs={18.5}
            name="race"
            error={formik.errors['race']}
            helperText={formik.errors['race']}
            value={formik.values.race}
          />

          <InputField
            isDisabled={isDisable}
            label="Religion"
            formik={formik}
            xs={18.5}
            name="religion"
            error={formik.errors['religion']}
            helperText={formik.errors['religion']}
            value={formik.values.religion}
          />

          <InputField
            label="District"
            formik={formik}
            name="district"
            isDisabled={isDisable}
            error={formik.errors['district']}
            helperText={formik.errors['district']}
            value={formik.values.district}
          />

          <InputField
            label="Phone Number"
            formik={formik}
            isDisabled={isDisable}
            name="contactNo"
            error={formik.errors['contactNo']}
            helperText={formik.errors['contactNo']}
            value={formik.values.contactNo}
          />

          <InputField
            label="Occupation"
            formik={formik}
            name="occupation"
            isDisabled={isDisable}
            error={formik.errors['occupation']}
            helperText={formik.errors['occupation']}
            value={formik.values.occupation}
          />

          <InputField
            label="Diagnosis"
            formik={formik}
            name="diagnosis"
            isDisabled={isDisable}
            error={formik.errors['diagnosis']}
            helperText={formik.errors['diagnosis']}
            value={formik.values.diagnosis}
          />

          <InputField
            label="Special Notes"
            formik={formik}
            name="specialNotes"
            isDisabled={isDisable}
            error={formik.errors['specialNotes']}
            helperText={formik.errors['specialNotes']}
            value={formik.values.specialNotes}
          />

          <RateSelector
            label="Priority"
            formik={formik}
            name="starPriorityLevel"
            isDisabled={isDisable}
          />

          <Form.Item wrapperCol={{span: 16, offset: 10}}>
            {id && isDisable ? (
              ' '
            ) : (
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={handleSubmit}
                // icon={<Add />}
              >
                {!id ? 'Add Patient to waiting list' : 'Update Patient info'}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default AddPatient

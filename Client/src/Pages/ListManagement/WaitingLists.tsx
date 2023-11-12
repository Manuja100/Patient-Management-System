import {Button, Form, Rate, Select} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import Table from 'antd/es/table'
import axios from 'axios'
import {useEffect, useState} from 'react'
import PopUp from '../../Components/ListManagement/PopUp'
import {useNavigate} from 'react-router-dom'

type SizeType = Parameters<typeof Form>[0]['size']

interface DataType {
  key: React.Key
  name: any
  age: number
  address: string
  serialNo: string
  dateOfRegistration: Date
  NIC: string
  district: string
  contactNo: number
  occupation: string
  race: string
  gender: string
  diagnosis: string
  consultantResponsible: string
  specialNotes: string
  starPriorityLevel: any
  next: any
}

interface DataType2 {
  _id: React.Key
  name: string
  dateOfBirth: string
  address: string
  serialNo: string
  dateOfRegistration: Date
  NIC: string
  district: string
  contactNo: number
  occupation: string
  race: string
  gender: string
  diagnosis: string
  consultantResponsible: string
  specialNotes: string
  starPriorityLevel: any
  next: any
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Serial Number',
    width: 100,
    dataIndex: 'serialNo',
    key: '1',
    fixed: 'left'
  },
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: '2',
    fixed: 'left'
  },
  {
    title: 'Date of Registration',
    dataIndex: 'dateOfRegistration',
    key: '3',
    width: 150
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: '4',
    width: 150
  },
  {
    title: 'NIC',
    dataIndex: 'NIC',
    key: '5',
    width: 150
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: '6',
    width: 150
  },
  {
    title: 'District',
    dataIndex: 'district',
    key: '7',
    width: 150
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNo',
    key: '8',
    width: 150
  },
  {
    title: 'Occupation',
    dataIndex: 'occupation',
    key: '9',
    width: 150
  },
  {
    title: 'Race/Religion',
    dataIndex: 'race',
    key: '10',
    width: 150
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: '11',
    width: 150
  },
  {title: 'Diagnosis', dataIndex: 'diagnosis', key: '12'},
  {
    title: 'Consultant Responsible',
    dataIndex: 'consultantResponsible',
    key: '13'
  },
  {title: 'Special Notes', dataIndex: 'specialNotes', key: '14'},
  {
    title: 'Priority',
    dataIndex: 'starPriorityLevel',
    key: '15'
  },
  {
    title: 'Action',
    dataIndex: 'next',
    key: 'next',
    fixed: 'right',
    width: 100
  }
]

const generateStars = (stars: number): JSX.Element => {
  return <Rate disabled allowHalf defaultValue={stars} />
}

const WaitingList = (): JSX.Element => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  )
  const [consultant, setConsultant] = useState<string[]>([])
  const [diagnosis, setDiagnosis] = useState<string[]>([])
  const [age, setAge] = useState<string[]>([])
  const [gender, setGender] = useState<string[]>([])
  const [district, setDitrict] = useState<string[]>([])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onFormLayoutChange = ({size}: {size: SizeType}) => {
    setComponentSize(size)
  }

  const handleGetRequest = (): void => {
    let min = 0
    let max = 200
    if (age.length !== 0) {
      min = 100
      max = 0
    }

    for (let i = 0; i < age.length; i++) {
      const inputParts: string[] = age[i].split(' - ')
      const value1: number = parseInt(inputParts[0])
      const value2: number = parseInt(inputParts[1])
      console.log(value1)
      console.log(value2)
      if (value2 > max) max = value2
      if (value1 < min) min = value1
    }

    axios
      .get('http://localhost:8000/list/filter', {
        params: {
          consultantResponsible: consultant,
          diagnosis,
          minAge: min,
          maxAge: max,
          gender,
          district
        }
      })
      .then(function (response) {
        setLists(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const navigate = useNavigate()

  const toPatientProfile = (id: any) => {
    navigate(`/patient-profile/${id}`)
  }

  const handleSelectConsultant = (values: string[]): void => {
    setConsultant(values)
  }

  const handleSelectDiagnosis = (values: string[]): void => {
    setDiagnosis(values)
  }

  const handleSelectAge = (values: string[]): void => {
    setAge(values)
  }

  const handleSelectCGender = (values: string[]): void => {
    setGender(values)
  }

  const handleSelectDistrict = (values: string[]): void => {
    setDitrict(values)
  }

  const [list, setLists] = useState<DataType2[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/waitingList/waiting')
      .then(function (response) {
        setLists(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  const data: DataType[] = []
  for (let i = 0; i < list.length; i++) {
    data.push({
      key: list[i]?._id,
      name: (
        <span
          onClick={() => toPatientProfile(list[i]?._id)}
          style={{cursor: 'pointer'}}
        >
          {list[i]?.name}
        </span>
      ),
      serialNo: list[i]?.serialNo,
      age: calculateAge(list[i]?.dateOfBirth),
      address: list[i]?.address,
      dateOfRegistration: list[i]?.dateOfRegistration,
      NIC: list[i]?.NIC,
      district: list[i]?.district,
      contactNo: list[i]?.contactNo,
      occupation: list[i]?.occupation,
      race: list[i]?.race,
      gender: list[i]?.gender,
      diagnosis: list[i]?.diagnosis,
      consultantResponsible: list[i]?.consultantResponsible,
      specialNotes: list[i]?.specialNotes,
      starPriorityLevel: generateStars(list[i]?.starPriorityLevel),
      next: (
        <>
          <PopUp waitingListId={list[i]?._id} />
        </>
      )
    })
  }

  const [filterConsultants, setFilterConsultants] = useState<string[]>([])
  const [filterdiagnosis, setFilterdiagnosis] = useState([])
  const [filterDistrict, setFilterSetDistrict] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/list/filter/items')
      .then(function (response) {
        setFilterConsultants(response.data.result[0].consultantResponsible)
        setFilterdiagnosis(response.data.result[0].diagnosis)
        setFilterSetDistrict(response.data.result[0].district)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        layout="inline"
        initialValues={{size: componentSize}}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{marginLeft: '8%', maxWidth: '100%'}}
      >
        <Form.Item style={{width: '15%'}}>
          <Select
            mode="multiple"
            onChange={handleSelectConsultant}
            placeholder="Consultant"
          >
            {filterConsultants.map((consultant) => (
              <Select.Option key={consultant} value={consultant}>
                {consultant}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{width: '15%'}}>
          <Select
            mode="multiple"
            onChange={handleSelectDiagnosis}
            placeholder="Diagnosis"
          >
            {filterdiagnosis.map((diagnosis) => (
              <Select.Option key={diagnosis} value={diagnosis}>
                {diagnosis}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{width: '20%'}}>
          <Select mode="multiple" onChange={handleSelectAge} placeholder="Age">
            <Select.Option value="0 - 15">0 - 15</Select.Option>
            <Select.Option value="16 - 30">16 - 30</Select.Option>
            <Select.Option value="31 - 45">31 - 45</Select.Option>
            <Select.Option value="46 - 60">46 - 60</Select.Option>
            <Select.Option value="60 - 100">Above 60</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{width: '15%'}}>
          <Select
            mode="multiple"
            onChange={handleSelectCGender}
            placeholder="Gender"
          >
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{width: '15%'}}>
          <Select
            mode="multiple"
            onChange={handleSelectDistrict}
            placeholder="District"
          >
            {filterDistrict.map((district) => (
              <Select.Option key={district} value={district}>
                {district}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleGetRequest}>Filter List</Button>
        </Form.Item>
      </Form>
      <br />
      <Table
        pagination={{pageSize: 5}}
        columns={columns}
        dataSource={data}
        scroll={{x: 2500, y: 1000}}
      />
    </>
  )
}

export default WaitingList

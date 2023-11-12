import {Rate} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import Table from 'antd/es/table'
import axios from 'axios'
import {useEffect, useState} from 'react'
import TakeBackPopUp from '../../Components/ListManagement/TakeBackPopUp'
import {useNavigate} from 'react-router-dom'

interface DataType {
  admissionDate: string
  yearlyNo: string
  monthlyNo: string
  dailyNo: string
  BHTNo: string
  clinicNo: string
  PHPNo: string
  gardien: string
  gardienContactNo: string
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
  operation: any
}

interface DataType2 {
  waitingListId: React.Key
  _id: React.Key
  admissionDate: string
  yearlyNo: string
  monthlyNo: string
  dailyNo: string
  BHTNo: string
  clinicNo: string
  PHPNo: string
  gardien: string
  gardienContactNo: string
  key: React.Key
  name: string
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
  waitingList: any
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
    title: 'Admission Date',
    dataIndex: 'admissionDate',
    key: '3',
    width: 150
  },
  {
    title: 'Yearly No',
    dataIndex: 'yearlyNo',
    key: '3',
    width: 150
  },
  {
    title: 'Monthly No',
    dataIndex: 'monthlyNo',
    key: '3',
    width: 150
  },
  {
    title: 'Daily No',
    dataIndex: 'dailyNo',
    key: '3',
    width: 150
  },
  {
    title: 'BHT No',
    dataIndex: 'BHTNo',
    key: '3',
    width: 150
  },
  {
    title: 'Clinic No',
    dataIndex: 'clinicNo',
    key: '3',
    width: 150
  },
  {
    title: 'PHP no',
    dataIndex: 'PHPNo',
    key: '3',
    width: 150
  },
  {
    title: 'Gardien',
    dataIndex: 'gardien',
    key: '3',
    width: 150
  },
  {
    title: 'Gardien ct. no.',
    dataIndex: 'gardienContactNo',
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
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    width: 125
  }
]

const generateStars = (stars: number): JSX.Element => {
  return <Rate disabled allowHalf defaultValue={stars} />
}

const ReAdmissionList = (): JSX.Element => {
  const navigate = useNavigate()

  const toPatientProfile = (id: any) => {
    navigate(`/patient-profile/${id}`)
  }
  const [list, setLists] = useState<DataType2[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/admissionList/readmission')
      .then(function (response) {
        // handle success
        setLists(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  const data: DataType[] = []
  for (let i = 0; i < list.length; i++) {
    data.push({
      serialNo: list[i]?.waitingList[0].serialNo,
      name: (
        <span
          onClick={() => toPatientProfile(list[i]?.waitingListId)}
          style={{cursor: 'pointer'}}
        >
          {list[i]?.waitingList[0].name}
        </span>
      ),
      age: list[i]?.waitingList[0].age,
      NIC: list[i]?.waitingList[0].NIC,
      address: list[i]?.waitingList[0].address,
      district: list[i]?.waitingList[0].district,
      contactNo: list[i]?.waitingList[0].contactNo,
      occupation: list[i]?.waitingList[0].occupation,
      race: list[i]?.waitingList[0].race,
      gender: list[i]?.waitingList[0].gender,
      diagnosis: list[i]?.waitingList[0].diagnosis,
      consultantResponsible: list[i]?.waitingList[0].consultantResponsible,
      specialNotes: list[i]?.waitingList[0].specialNotes,
      starPriorityLevel: generateStars(
        list[i]?.waitingList[0].starPriorityLevel
      ),
      admissionDate: list[i]?.admissionDate,
      yearlyNo: list[i]?.yearlyNo,
      monthlyNo: list[i]?.monthlyNo,
      dailyNo: list[i]?.dailyNo,
      BHTNo: list[i]?.BHTNo,
      clinicNo: list[i]?.clinicNo,
      PHPNo: list[i]?.PHPNo,
      gardien: list[i]?.gardien,
      gardienContactNo: list[i]?.gardienContactNo,
      key: '',
      dateOfRegistration: list[i]?.dateOfRegistration,
      operation: (
        <TakeBackPopUp
          waitingListId={list[i]?.waitingListId}
          nextState={'admission'}
        />
      )
    })
  }

  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{x: 3500, y: 1000}} />
    </>
  )
}

export default ReAdmissionList

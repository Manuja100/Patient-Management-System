import {Button, DatePicker} from 'antd'
import {useEffect, useRef, useState} from 'react'
import LineGraph from '../../Components/PatientManagement/LineGraph'
import BarChart from '../../Components/PatientManagement/BarChart'
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import axios from 'axios'
import {ColumnsType} from 'antd/es/table'
import Table from 'antd/es/table'
import {useNavigate} from 'react-router-dom'

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

type Patient = {
  _id: string
  name: any
  serialNo: string
  dateOfRegistration: string
  gender: string
  district: string
  clinicRegNo: string
  address: string
  contactNo: string
  occupation: string
  diagnosis: string
  consultantResponsible: string
  specialNotes: string
  NIC: string
  starPriorityLevel: number
  hover: number
  dateOfBirth: string
  race: string
  religion: string
  status: string
  isDeceased: boolean
  deceasedDate: string
}

interface DataType extends Patient {
  key: React.Key
  age: number
  button: any
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Serial Number',
    width: 30,
    dataIndex: 'serialNo',
    key: '1',
    fixed: 'left'
  },
  {
    title: 'Name',
    width: 40,
    dataIndex: 'name',
    key: '2',
    fixed: 'left'
  },
  {
    title: 'Clinic No',
    dataIndex: 'clinicRegNo',
    key: '3',
    width: 30
  },
  {
    title: 'Deceased Date',
    dataIndex: 'deceasedDate',
    key: '4',
    width: 30
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: '5',
    width: 30
  },
  {
    title: 'Diagnosis',
    dataIndex: 'diagnosis',
    key: '6',
    width: 50
  },
  {
    title: 'Consultant Responsible',
    dataIndex: 'consultantResponsible',
    key: '7',
    width: 50
  },
  {
    title: 'Profile',
    dataIndex: 'button',
    key: '8',
    fixed: 'right',
    width: 30
  }
]

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

const DiseasedList = (): JSX.Element => {
  const [filteredYear, setFilteredYear] = useState<number>()
  const [chartType, setChartType] = useState('bar')
  const [showChart, setShowChart] = useState<boolean>(false)
  const [list, setList] = useState<Patient[]>([])
  const navigate = useNavigate()

  const onchange = (date: any, dateString: any) => {
    if (date) {
      const selectedYear = parseInt(dateString)
      setFilteredYear(selectedYear)
    } else {
      setFilteredYear(undefined)
    }
  }

  const goToProfile = (e: any) => {
    const id = e.currentTarget.id
    navigate(`/patient-profile/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Patient[]>(
          'http://localhost:8000/patient/decease-list/all'
        )
        setList(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const toPatientProfile = (id: any) => {
    navigate(`/patient-profile/${id}`)
  }

  const data: DataType[] = list.map((patient) => ({
    ...patient,
    name: (
      <span
        onClick={() => toPatientProfile(patient._id)}
        style={{cursor: 'pointer'}}
      >
        {patient.name}
      </span>
    ),
    key: patient._id,
    age: calculateAge(patient.dateOfBirth),
    button: (
      <Button id={patient._id} onClick={goToProfile}>
        More Details
      </Button>
    )
  }))

  const toggleChartVisibility = () => {
    setShowChart(!showChart)
  }
  const toggleChart = () => {
    setChartType((prev) => {
      if (prev === 'bar') return 'line'
      else return 'bar'
    })
  }

  return (
    <>
      <Button
        onClick={toggleChartVisibility}
        style={{marginLeft: 5, marginRight: 20}}
      >
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </Button>
      {showChart && <DatePicker onChange={onchange} picker="year" />}
      {showChart && (
        <Button onClick={toggleChart} style={{marginLeft: 20, marginRight: 20}}>
          {chartType === 'bar' ? 'Bar Chart' : 'Line Chart'}
        </Button>
      )}

      <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        {chartType === 'bar'
          ? showChart && (
              <LineGraph
                showChart={showChart}
                list={list}
                filteredYear={filteredYear}
              />
            )
          : showChart && <BarChart list={list} filteredYear={filteredYear} />}
      </div>

      {}
      {}
      <Table columns={columns} dataSource={data} scroll={{x: 500, y: 1000}} />
    </>
  )
}

export default DiseasedList

import {Avatar, Button, Col, Form, Row, Typography} from 'antd'
import AddPatient from './AddPatient'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const {Text} = Typography
const url = import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL

export const PatientProfile = () => {
  const {id} = useParams<{id: string}>()
  const [load, setLoad] = useState<boolean>(true)
  const [isDeceased, setIsDeceased] = useState<boolean>(false)

  const handleDeceased = () => {
    Swal.fire({
      title: 'Enter Deceased Date',
      html: '<input type="date" id="deceased-date" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Add to Deceased List',
      preConfirm: () => {
        const deceasedDateInput = document.getElementById(
          'deceased-date'
        ) as HTMLInputElement
        const deceasedDate = deceasedDateInput.value

        if (deceasedDate) {
          axios
            .delete(`http://localhost:8000/patient/decease-list/${id}`, {
              data: {deceasedDate}
            })
            .then((res) => {
              if (res.status === 200) {
                Swal.fire(
                  'Success!',
                  'Patient added to deceased list.',
                  'success'
                )
              } else {
                Swal.fire('Error', 'Something went wrong!', 'error')
              }
            })
            .catch((error) => {
              Swal.fire('Error', 'Something went wrong!', 'error')
            })
        }
      }
    })
  }

  const [isDisable, setIsDisable] = useState(id ? true : false)
  const handleDisabled = () => {
    if (isDisable && !isDeceased) {
      setIsDisable(!isDisable)
    } else if (isDisable) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot edit details of deceased person'
      })
    }
  }

  const report = (
    <Form.Item>
      <Button type="primary" shape="round" size="large">
        Reports
      </Button>
    </Form.Item>
  )

  const checkups = (
    <Form.Item>
      <Button type="primary" shape="round" size="large">
        Checkups
      </Button>
    </Form.Item>
  )

  const deceased = (
    <Form.Item>
      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={handleDeceased}
      >
        Add to Deceased List
      </Button>
    </Form.Item>
  )

  const editInfo = (
    <Form.Item>
      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={handleDisabled}
      >
        Edit Info
      </Button>
    </Form.Item>
  )
  console.log(isDeceased)

  return (
    <Row justify="center" align="middle">
      <Form style={{maxWidth: '100%', flex: 'auto'}}>
        <Col>
          <AddPatient
            isDisable={isDisable}
            setIsDisable={setIsDisable}
            id={id}
            isLoading={setLoad}
            setIsDecease={setIsDeceased}
          />
        </Col>
        <Form.Item wrapperCol={{span: 14, offset: 6}}>
          <Row gutter={[16, 16]}>
            {isDisable && !load && (
              <>
                <Col flex="auto">{report}</Col>
                <Col flex="auto">{checkups}</Col>
                <Col flex="auto">{editInfo}</Col>
                <Col flex="auto"> {deceased}</Col>
              </>
            )}
          </Row>
        </Form.Item>
      </Form>
    </Row>
  )
}

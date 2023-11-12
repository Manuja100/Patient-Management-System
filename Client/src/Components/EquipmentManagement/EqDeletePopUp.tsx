import {Button, Modal, Space, message} from 'antd'
import {useState} from 'react'
import axios from 'axios'

interface EquipmentFormProps {
  equipmentListId: any
}

function redirectToRoute(route: string): void {
  window.location.href = route
}

const deleteRecord = (EquipmentId: any): void => {
  console.log(EquipmentId)

  axios
    .delete(`http://localhost:8000/eqList/${EquipmentId}`)
    .then((response) => {
      console.log(response)
      void message.success('Equipment Deleted successfully')
    })
    .catch((error) => {
      console.log(error)
    })
}

const EqDeletePopUp = (equipmentListId: EquipmentFormProps): JSX.Element => {
  const objStr = JSON.stringify(equipmentListId)
  console.log(equipmentListId)
  const matchResult = objStr.match(/(?<="equipmentListId":")[^"]+/)
  const id = matchResult != null ? matchResult[0] : ''
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Delete
      </Button>
      <Modal
        title="Are you sure you want to permanently delete this Equipment ?"
        centered
        open={open}
        onOk={() => {
          deleteRecord(id)
          redirectToRoute('/eqlist')
          setOpen(false)
          message.success('Equipment Deleted successfully')
        }}
        onCancel={() => {
          setOpen(false)
          redirectToRoute('/eqlist')
        }}
        width={500}
      ></Modal>
    </>
  )
}
export default EqDeletePopUp

import {Button, Modal} from 'antd'
import {useState} from 'react'
import EditEqForm from './EditEqForm'

function redirectToRoute(route: string): void {
  window.location.href = route
}

const EqEditPopUp = (equipmentListId: any): JSX.Element => {
  const objStr = JSON.stringify(equipmentListId)
  const matchResult = objStr.match(/(?<="equipmentListId":")[^"]+/)
  const id = matchResult != null ? matchResult[0] : ''
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        Edit
      </Button>
      <Modal
        title="Equipment Edit Form"
        centered
        open={open}
        onOk={() => {
          setOpen(false)
          redirectToRoute('/eqlist')
        }}
        onCancel={() => {
          redirectToRoute('/eqlist')
          setOpen(false)
        }}
        footer={null}
        width={500}
      >
        <EditEqForm equipmentListId={id} />
      </Modal>
    </>
  )
}
export default EqEditPopUp

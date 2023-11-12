import { Button, Modal } from 'antd'
import { useState } from 'react'
import AdmissionForm from './AdmissionForm'

const PopUp = (id: any): JSX.Element => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        Next
      </Button>
      <Modal
        title="Add Admission Details"
        centered
        open={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={500}
        footer={null}
      >
        <br />
        <AdmissionForm waitingListId={id} />
      </Modal>
    </>
  )
}
export default PopUp

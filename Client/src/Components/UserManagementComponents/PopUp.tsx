/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal} from 'antd'
import {useState} from 'react'
// import DeletePopUp from './deletePopUp'

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
        Delete
      </Button>
      <Modal
        title="Modal 500px width"
        centered
        open={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={500}
      ></Modal>
    </>
  )
}
export default PopUp

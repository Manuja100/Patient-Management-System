import {ExclamationCircleTwoTone} from '@ant-design/icons'
import {Button, Modal, Popover, Space, message} from 'antd'
import {useState} from 'react'
import EqForm from './EqForm'

function redirectToRoute(route: string): void {
  window.location.href = route
}

const EqPopUp = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
        style={{marginTop: '-10%', marginLeft: '89%', maxWidth: '100%'}}
      >
        Create Equipment
      </Button>
      <Modal
        title="Create Equipment Form"
        centered
        open={open}
        onOk={() => {
          redirectToRoute('/eqlist')
          setOpen(false)
        }}
        onCancel={() => {
          redirectToRoute('/eqlist')
          setOpen(false)
        }}
        width={500}
        footer={null}
      >
        <EqForm />
      </Modal>
    </>
  )
}
export default EqPopUp

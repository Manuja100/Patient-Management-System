/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Button, Modal, Space, message} from 'antd'
import axios from 'axios'
import {useState} from 'react'

interface userData {
  userID: any
}

function redirectToRoute(route: string): void {
  window.location.href = route
}

const deleteRecord = (id: string): void => {
  console.log(id)

  axios
    .delete(`http://localhost:8000/deleteUser/${id}`)
    .then((response) => {
      console.log(response)
      void message.success('User Deleted successfully')
    })
    .catch((error) => {
      console.log(error)
      void message.error('Cant Delete Admin')
    })
}

const DeleteUserPopUp = (userID: userData): JSX.Element => {
  const objStr = JSON.stringify(userID)
  console.log(userID)
  const matchResult = objStr.match(/(?<="userID":")[^"]+/)
  const id = matchResult != null ? matchResult[0] : ''

  const [open, setOpen] = useState(false)
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true)
          }}
        >
          Delete
        </Button>
      </Space>
      <Modal
        title="Are you sure you want to delete this user ?"
        centered
        open={open}
        onOk={() => {
          deleteRecord(id)
          redirectToRoute('/admin')
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
export default DeleteUserPopUp

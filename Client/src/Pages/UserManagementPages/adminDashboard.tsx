/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {ColumnsType} from 'antd/es/table'
import Table from 'antd/es/table'
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import './css/adminHome.css'

// import PopUp from '../Components/PopUp'
import DeleteUserPopUp from '../../Components/UserManagementComponents/deletePopUp'
import AddUserBtn from '../../Components/UserManagementComponents/addUserBtn'
import EditUserBtn from '../../Components/UserManagementComponents/editUserBtn'

import {AuthContext} from '../../context/AuthContext'
import Analytics from '../../Components/UserManagementComponents/analytics'

import {Button, Modal, message} from 'antd'

import ExcelJS from 'exceljs'

interface tableData {
  firstName: string
  lastName: string
  userType: string
  designation: string
  contactNumber: string
  email: string
  delete: any
  edit: any
}

interface resData {
  _id: React.Key
  firstName: string
  lastName: string
  userType: string
  designation: string
  contactNumber: string
  email: string
  delete: any
  edit: any
}

const columns: ColumnsType<tableData> = [
  {
    title: 'First Name',
    width: 50,
    dataIndex: 'firstName',
    key: '1'
  },
  {
    title: 'Last Name',
    width: 50,
    dataIndex: 'lastName',
    key: '2'
  },
  {
    title: 'User Type',
    dataIndex: 'userType',
    key: '3',
    width: 50
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: '4',
    width: 50
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
    key: '5',
    width: 50
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: '6',
    width: 100
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    fixed: 'right',
    width: 30
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
    fixed: 'right',
    width: 30
  }
]

const UserList = (): JSX.Element => {
  const {token} = useContext(AuthContext)
  const headers = {authorization: 'Bearer ' + token}

  const [list, setLists] = useState<resData[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/user', {headers})
      .then(function (response) {
        // handle success response
        setLists(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error response
        console.log(error)
      })
  }, [])

  const data: tableData[] = []
  for (let i = 0; i < list.length; i++) {
    data.push({
      firstName: list[i]?.firstName,
      lastName: list[i]?.lastName,
      userType: list[i]?.userType,
      designation: list[i]?.designation,
      contactNumber: list[i]?.contactNumber,
      email: list[i]?.email,
      delete: <DeleteUserPopUp userID={list[i]?._id} />,
      edit: <EditUserBtn userID={list[i]?._id} />
    })
  }

  // download excel sheet
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const reportDownload = async () => {
    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Users')

      // Define the columns in the worksheet
      worksheet.columns = [
        {header: 'First Name', key: 'firstName', width: 12},
        {header: 'Last Name', key: 'lastName', width: 12},
        {header: 'User Type', key: 'userType', width: 12},
        {header: 'Designation', key: 'designation', width: 12},
        {header: 'Contact Number', key: 'contactNumber', width: 15},
        {header: 'Email Address', key: 'email', width: 35}
      ]

      // Add data rows to the worksheet
      list.forEach((user) => {
        worksheet.addRow(user)
      })

      // Generate Excel file buffer
      const buffer = await workbook.xlsx.writeBuffer()

      // Create a Blob object
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      // Create a temporary anchor element
      const anchor = document.createElement('a')
      anchor.href = URL.createObjectURL(blob)
      anchor.download = 'user-list.xlsx'
      anchor.click()

      // Clean up the temporary anchor element
      URL.revokeObjectURL(anchor.href)
      void message.success('Downloaded successfully')
      handleCancel()
    } catch (error) {
      void message.error('Download Failed')
      console.log('Error generating Excel file:', error)
    }
  }
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = (): void => {
    setVisible(true)
  }

  const handleCancel = (): void => {
    setVisible(false)
  }

  return (
    <>
      <div className="adminHomeBtns">
        <div className="addUserBtn">
          <AddUserBtn />
        </div>
        <div className="analyticsBtn">
          <Analytics />
        </div>
        <div className="reportBtn">
          <Button type="primary" onClick={showModal}>
            Report
          </Button>
          <Modal
            title="Confirm Download"
            visible={visible}
            onCancel={handleCancel}
            width={300}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="logout" type="primary" onClick={reportDownload}>
                Download
              </Button>
            ]}
          ></Modal>
        </div>
      </div>

      <Table
        pagination={{pageSize: 6}}
        columns={columns}
        dataSource={data}
        scroll={{x: 100, y: 1000}}
      />
    </>
  )
}

export default UserList

import React, {useEffect, useState} from 'react'
import {Table, Button, Space, Form, Select, message} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import axios from 'axios'
import EqEditPopUp from '../../components/EquipmentManagement/EqEditPopUp'
import EqPopUp from '../../components/EquipmentManagement/EqPopup'
import EqMovePopup from '../../components/EquipmentManagement/EqMovePopup'
import ExcelJS from 'exceljs'

type SizeType = Parameters<typeof Form>[0]['size']

interface DataType {
  key: React.Key
  Serial: number
  Equipment: string
  Type: string
  Page: number
  quantity: number
  location: string
  Edit: any
  Delete: any
}

interface ResponseData {
  _id: React.Key
  serialNo: number
  name: string
  Type: string
  pageNo: number
  Quantity: number
  location: string
  Edit: any
  Delete: any
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Serial Number',
    width: 100,
    dataIndex: 'Serial',
    key: '2',
    fixed: 'left'
  },
  {
    title: 'Equipment Name',
    width: 101,
    dataIndex: 'Equipment',
    key: '3',
    fixed: 'left'
  },
  {
    title: 'Equipment Type',
    width: 101,
    dataIndex: 'Type',
    key: '4',
    fixed: 'left'
  },
  {
    title: 'Page Number',
    width: 100,
    dataIndex: 'Page',
    key: '5',
    fixed: 'left'
  },
  {
    title: 'Quantity',
    width: 100,
    dataIndex: 'quantity',
    key: '6',
    fixed: 'left'
  },
  {
    title: 'Location',
    width: 101,
    dataIndex: 'location',
    key: '7',
    fixed: 'left'
  },
  {
    title: '',
    dataIndex: 'Edit',
    key: 'Edit',
    fixed: 'right',
    width: 100
  },
  {
    title: '',
    dataIndex: 'Delete',
    key: 'Delete',
    fixed: 'right',
    width: 100
  }
]

const EqList = (): JSX.Element => {
  const [eqList, setLists] = useState<ResponseData[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/eqList')
      .then(function (response) {
        // handle success
        setLists(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  )
  const [equipment, setEquipment] = useState<string[]>([])

  const onFormLayoutChange = ({size}: {size: SizeType}): void => {
    setComponentSize(size)
  }

  const handleGetRequest = (): void => {
    console.log(equipment)
    axios
      .get('http://localhost:8000/eqlist/filter', {
        params: {
          Type: equipment
        }
      })
      .then(function (response) {
        setLists(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSelectEquipment = (values: string[]): void => {
    setEquipment(values)
  }

  const data: DataType[] = []
  for (let i = 0; i < eqList.length; i++) {
    data.push({
      key: eqList[i]?.serialNo,
      Serial: eqList[i]?.serialNo,
      Equipment: eqList[i]?.name,
      Type: eqList[i]?.Type,
      Page: eqList[i]?.pageNo,
      quantity: eqList[i]?.Quantity,
      location: eqList[i]?.location,
      Edit: <EqEditPopUp equipmentListId={eqList[i]?._id} />,
      Delete: <EqMovePopup equipmentListId={eqList[i]?._id} />
    })
  }

  const reportDownload = async () => {
    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Equipment')

      // Define the columns in the worksheet
      worksheet.columns = [
        {header: 'Serial Number', key: 'serialNo', width: 12},
        {header: 'Equipment Name', key: 'name', width: 12},
        {header: 'Equipment Type', key: 'Type', width: 12},
        {header: 'Page Number', key: 'pageNo', width: 12},
        {header: 'Quantity', key: 'Quantity', width: 15},
        {header: 'Location', key: 'location', width: 35}
      ]

      // Add data rows to the worksheet
      eqList.forEach((eqLists) => {
        worksheet.addRow(eqLists)
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
      anchor.download = 'Equipment_Lists.xlsx'
      anchor.click()

      // Clean up the temporary anchor element
      URL.revokeObjectURL(anchor.href)
      void message.success('Downloaded successfully')
    } catch (error) {
      void message.error('Download Failed')
      console.log('Error generating Excel file:', error)
    }
  }

  return (
    <>
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        layout="inline"
        initialValues={{size: componentSize}}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{marginLeft: '10%', maxWidth: '100%'}}
      >
        <Form.Item style={{width: '15%'}}>
          <Select mode="multiple" onChange={handleSelectEquipment}>
            <Select.Option value="Surgical Inv">Surgical Inv</Select.Option>
            <Select.Option value="Hardware">Hardware</Select.Option>
            <Select.Option value="Furniture">Furniture</Select.Option>
            <Select.Option value="Linent">Linent</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleGetRequest}>Filter List</Button>
        </Form.Item>
      </Form>

      <EqPopUp />
      <br />
      <br />
      <Button
        type="primary"
        onClick={reportDownload}
        style={{marginLeft: '91.80%', maxWidth: '100%'}}
      >
        Report
      </Button>
      <br />
      <br />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{pageSize: 5}}
        scroll={{y: 500}}
      />
    </>
  )
}
export default EqList

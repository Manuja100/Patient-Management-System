/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
// import PopUp from '../Components/PopUp'
import {AuthContext} from '../../context/AuthContext'

import {Button, Card, Modal, Space, Statistic} from 'antd'
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'

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

function redirectToRoute(route: string): void {
  window.location.href = route
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const UserList = (): JSX.Element => {
  const {token} = useContext(AuthContext)
  const headers = {authorization: 'Bearer ' + token}

  const [list, setLists] = useState<resData[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/user', {headers})
      .then(function (response) {
        // handle success
        setLists(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  // analytics page
  const countUserRoles = (): Record<string, number> => {
    const roleCount: Record<string, number> = {
      consultant: 0,
      doctor: 0,
      nurse: 0,
      headnurse: 0,
      admin: 0
    }

    list.forEach((user) => {
      const role = user.userType.toString().toLowerCase().replace(/\s+/g, '')

      // eslint-disable-next-line no-prototype-builtins
      if (roleCount.hasOwnProperty(role)) {
        roleCount[role]++
      }
    })
    return roleCount
  }

  interface DashboardCardProps {
    title: string
    value: number | string
  }

  const roleCounts = countUserRoles()
  const totalUsers =
    roleCounts.consultant +
    roleCounts.doctor +
    roleCounts.headnurse +
    roleCounts.nurse +
    roleCounts.admin

  const totUsers = list.length

  // eslint-disable-next-line react/prop-types
  const DashboardCard: React.FC<DashboardCardProps> = ({title, value}) => {
    const percentage = ((value as number) / totalUsers) * 100
    return (
      <Card style={{width: 150}}>
        <Space direction="horizontal">
          <Statistic title={title} value={value} style={{}} />
        </Space>
      </Card>
    )
  }
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
          Analytics
        </Button>
      </Space>
      <Modal
        title="Number of Users in the System"
        centered
        visible={open}
        onCancel={() => {
          setOpen(false)
          redirectToRoute('/admin')
        }}
        okButtonProps={{
          style: {
            display: 'none'
          }
        }}
        width={800}
      >
        <div className="roleCountBlocks">
          <div className="roleCountCons">
            <DashboardCard title="Consultants" value={roleCounts.consultant} />
          </div>
          <div className="roleCountDoctor">
            <DashboardCard title="Doctors" value={roleCounts.doctor} />
          </div>
          <div className="roleCountNurse">
            <DashboardCard title="Nurses" value={roleCounts.nurse} />
          </div>
          <div className="roleCountHeadNurse">
            <DashboardCard title="Head Nurse" value={roleCounts.headnurse} />
          </div>
          <div className="roleCountAdmin">
            <DashboardCard title="Admins" value={roleCounts.admin} />
          </div>
          <div className="roleCountTotal">
            <DashboardCard title="Total" value={totUsers} />
          </div>
        </div>
        <div className="pieChart">
          <PieChart width={600} height={400}>
            <Pie
              data={Object.entries(roleCounts).map(([role, count]) => ({
                name: role,
                value: count
              }))}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({cx, cy, midAngle, innerRadius, outerRadius, value}) => {
                const RADIAN = Math.PI / 180
                const radius = 25 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#8884d8"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {`${((value / totalUsers) * 100).toFixed(1)}%`}
                  </text>
                )
              }}
              dataKey={'value'}
            >
              {Object.entries(roleCounts).map(([role, count], index) => (
                <Cell key={role} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </Modal>
    </>
  )
}

export default UserList

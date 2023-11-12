import {useEffect, useRef, useState} from 'react'
import {formatCountdown} from 'antd/es/statistic/utils'
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import {DatePicker} from 'antd'
import {Moment} from 'moment'

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)
const date = new Date()
const year = date.getFullYear()
type Patient = {
  _id: string
  name: string
  serialNo: string
  dateOfRegistration: string
  gender: string
  district: string
  clinicRegNo: string
  address: string
  contactNo: string
  occupation: string
  diagnosis: string
  consultantResponsible: string
  specialNotes: string
  NIC: string
  starPriorityLevel: number
  hover: number
  dateOfBirth: string
  race: string
  religion: string
  status: string
  isDeceased: boolean
  deceasedDate: string
}

type StatsProps = {
  showChart: boolean
  list: Patient[]
  filteredYear?: number | undefined
}

const LineGraph = ({list, showChart, filteredYear = year}: StatsProps) => {
  // const [filteredYear, setFilteredYear] = useState<number>()
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current && showChart) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const deceasedCountPerMonth = list.reduce(
          (countMap: Map<string, number>, patient: Patient) => {
            const {deceasedDate} = patient

            if (deceasedDate) {
              const date = new Date(deceasedDate)
              const year = date.getFullYear()
              const month = date.getMonth() + 1 // Months are zero-based, so add 1
              if (year === filteredYear) {
                const monthKey = `${year}-${month}`

                countMap.set(monthKey, (countMap.get(monthKey) || 0) + 1)
              }
            }

            return countMap
          },
          new Map<string, number>()
        )

        const currentYear = new Date().getFullYear()
        const monthCounts = []

        for (let month = 1; month <= 12; month++) {
          const monthKey = `${currentYear}-${month}`
          const count = deceasedCountPerMonth.get(monthKey) || 0
          monthCounts.push({month, count})
        }

        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
        const chartData = {
          labels: monthNames,
          datasets: [
            {
              label: 'Deceased Count',
              data: monthCounts.map((monthCount) => monthCount.count),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: false
            }
          ]
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Month'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Deceased Count'
                },
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            }
          }
        })
      }
    }
  }, [chartRef, showChart, list, filteredYear])

  return (
    <div
      ref={chartContainerRef}
      style={{
        maxHeight: '500px',
        width: '1000px',
        opacity: showChart ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}
    >
      {showChart && <canvas ref={chartRef} />}
    </div>
  )
}

export default LineGraph

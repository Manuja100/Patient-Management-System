import {useEffect, useRef} from 'react'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
)

type Patient = {
  _id: string
  name: string
  dateOfBirth: string
  deceasedDate: string
  gender: string
}

type RoundChartProps = {
  list: Patient[]
  filteredYear: number | undefined
}

const BarChart: React.FC<RoundChartProps> = ({list, filteredYear}) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        // Filter patients based on deceased year
        if (filteredYear !== undefined) {
        }
        const filteredPatients = filteredYear
          ? list.filter(
              (patient) =>
                new Date(patient.deceasedDate).getFullYear() === filteredYear
            )
          : list
        const ageRanges = {
          '10-20': 0,
          '20-30': 0,
          '30-40': 0,
          '40-50': 0,
          '50-60': 0,
          '60+': 0
        }

        filteredPatients.forEach((patient) => {
          const birthYear = new Date(patient.dateOfBirth).getFullYear()
          const age = new Date().getFullYear() - birthYear
          if (age >= 10 && age < 20) {
            ageRanges['10-20'] += 1
          } else if (age >= 20 && age < 30) {
            ageRanges['20-30'] += 1
          } else if (age >= 30 && age < 40) {
            ageRanges['30-40'] += 1
          } else if (age >= 40 && age < 50) {
            ageRanges['40-50'] += 1
          } else if (age >= 50 && age < 60) {
            ageRanges['50-60'] += 1
          } else if (age >= 60) {
            ageRanges['60+'] += 1
          }
        })

        const labels = Object.keys(ageRanges)
        const maleData = Object.values(ageRanges).map(() => 0)
        const femaleData = Object.values(ageRanges).map(() => 0)

        // Calculate male and female counts for each age range
        filteredPatients.forEach((patient) => {
          const birthYear = new Date(patient.dateOfBirth).getFullYear()
          const age = new Date().getFullYear() - birthYear
          const gender = patient.gender.toLowerCase()
          if (age >= 10 && age < 20) {
            if (gender === 'male') {
              maleData[0] += 1
            } else if (gender === 'female') {
              femaleData[0] += 1
            }
          } else if (age >= 20 && age < 30) {
            if (gender === 'male') {
              maleData[1] += 1
            } else if (gender === 'female') {
              femaleData[1] += 1
            }
          } else if (age >= 30 && age < 40) {
            if (gender === 'male') {
              maleData[2] += 1
            } else if (gender === 'female') {
              femaleData[2] += 1
            }
          } else if (age >= 40 && age < 50) {
            if (gender === 'male') {
              maleData[3] += 1
            } else if (gender === 'female') {
              femaleData[3] += 1
            }
          } else {
            if (gender === 'male') {
              maleData[4] += 1
            } else if (gender === 'female') {
              femaleData[4] += 1
            }
          }
        })

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Male',
              data: maleData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            },
            {
              label: 'Female',
              data: femaleData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,

            plugins: {
              legend: {
                position: 'top'
              }
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Age Range'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Patient Count'
                },
                beginAtZero: true,
                // suggestedMax: Math.max(...Object.values(ageRanges)),
                ticks: {
                  precision: 0
                }
              }
            }
          }
        })
      }
    }
  }, [list, filteredYear])

  return (
    <div
      style={{
        maxHeight: '500px',
        width: '1000px',

        transition: 'opacity 0.5s ease'
      }}
    >
      {' '}
      <canvas ref={chartRef} />{' '}
    </div>
  )
}

export default BarChart

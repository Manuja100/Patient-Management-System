import { Button, Card, Col, Modal, Row, Space, Statistic } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import { PDFDocument, rgb } from 'pdf-lib'

const TurnOverReport = (): JSX.Element => {
  const [dnum, setDnum] = useState<number>()
  const [mnum, setMnum] = useState<number>()
  const [ynum, setYnum] = useState<number>()
  useEffect(() => {
    axios
      .get('http://localhost:8000/lists/generateReport')
      .then(function (response) {
        // handle success
        setDnum(response.data.dNo)
        setMnum(response.data.mNo)
        setYnum(response.data.yNo)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()

    page.drawText('Kandy General Hospital', {
      x: 50,
      y: page.getHeight() - 100,
      size: 28
    })

    page.drawText('TurnOver Report', {
      x: 50,
      y: page.getHeight() - 150,
      size: 24
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    page.drawText(`Daily Number: ${dnum}`, {
      x: 50,
      y: page.getHeight() - 200,
      size: 24,
      color: rgb(0, 0.53, 0)
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    page.drawText(`Monthly Number: ${mnum}`, {
      x: 50,
      y: page.getHeight() - 250,
      size: 24,
      color: rgb(0, 0.53, 0)
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    page.drawText(`Yearly Number: ${ynum}`, {
      x: 50,
      y: page.getHeight() - 300,
      size: 24,
      color: rgb(0, 0.53, 0)
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    saveAs(blob, 'turnover_report.pdf')
  }

  const [open, setOpen] = useState(false)
  return (
    <>
      <Space>
        <Button
          onClick={() => {
            setOpen(true)
          }}
        >
          Turnover Report
        </Button>
      </Space>

      <Modal
        centered
        visible={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        footer={null}
        width={500}
      >
        <center>
          <h2>Turnover Report</h2>
        </center>
        <Row gutter={16} justify="center" align="middle">
          <Col span={6}>
            <Card bordered={false} align="middle">
              <Statistic
                title="Daily"
                value={dnum}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} align="middle">
              <Statistic
                title="Monthly"
                value={mnum}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} align="middle">
              <Statistic
                title="Yearly"
                value={ynum}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
        <center>
          <br />
          <Button onClick={generatePDF}>Download</Button>
        </center>
      </Modal>
    </>
  )
}
export default TurnOverReport

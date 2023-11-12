import { PDFDocument } from 'pdf-lib'

import * as FileSaver from 'file-saver'
import { Button } from 'antd'

const downloadPdf = async (): Promise<void> => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()

  // Add a new page to the document
  const page = pdfDoc.addPage()

  // Draw some text on the page
  const { width, height } = page.getSize()
  const fontSize = 50
  const text = 'Hello, world!'
  page.drawText(text, {
    x: width / 2 - (fontSize * text.length) / 4,
    y: height / 2,
    size: fontSize
  })

  // Get the document bytes as a Uint8Array
  const pdfBytes = await pdfDoc.save()

  // Create a Blob from the bytes
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })

  // Save the Blob as a file
  FileSaver.saveAs(blob, 'document.pdf')
}
const Report = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <Button onClick={downloadPdf}>Download PDF</Button>
}

export default Report

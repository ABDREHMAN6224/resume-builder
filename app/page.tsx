"use client"

import { useState } from 'react'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ResumeData, Style } from './types'
import StyleOptions from '@/components/StyleOption'

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: '',
    education: {
      degree: '',
      institution: '',
      cgpa: '',
      expectedGraduation: ''
    },
    contact: {
      campus: '',
      phone: '',
      email: ''
    },
    title: '',
    summary: '',
    links: [],
    skills: {
      technologies: [],
      frameworks: [],
      tools: []
    },
    experience: [],
    projects: []
  })

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //   if (files && files.length > 0) {
  //     setFile(files[0])
  //   }
  // }

  // const handleDownloadJSON = () => {
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       const data = event.target?.result
  //       if (typeof data === 'string') {
  //         const json = JSON.parse(data)
  //         setResumeData(json.resumeData)
  //         setStyle(json.style)
  //       }
  //     }
  //     reader.readAsText(file)
  //   }
  // }

  const [style, setStyle] = useState<Style>({
    fontFamily: 'Arial',
    primaryColor: '#000000',
    secondaryColor: '#4a4a4a',
    fontSize: '14px'
  })

  const handleDataChange = (newData: Partial<ResumeData>) => {
    setResumeData(prevData => ({ ...prevData, ...newData }))
  }

  const handleStyleChange = (newStyle: Partial<Style>) => {
    setStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
  }

  const handleDownloadPDF = () => {
    const input = document.getElementById('resume-preview')
    if (input) {
      html2canvas(input, {
        scale: 3,
        useCORS: true,
        logging: false
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0)
        const pdf = new jsPDF({
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        })
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('resume_'+resumeData.fullName+'.pdf')

        // const json = JSON.stringify({ resumeData, style }, null, 2)
        // const blob = new Blob([json], { type: 'application/json' })
        // const url = URL.createObjectURL(blob)
        // const a = document.createElement('a')
        // a.href = url
        // a.download = 'resume_'+resumeData.fullName+'.json'
        // a.click()

      })
    }
  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
      {/* uplaod json and load form it */}
      {/* <input type="file" onChange={handleFileChange} />
       <Button onClick={handleDownloadJSON} className="mb-4">
        Read from JSON
      </Button> */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ResumeForm data={resumeData} onChange={handleDataChange} />
          <StyleOptions style={style} onChange={handleStyleChange} />
          <Button onClick={handleDownloadPDF} className="mt-4 w-full">
            Download PDF
          </Button>
        </div>
        <div className="w-full lg:w-1/2">
          <ResumePreview data={resumeData} style={style} />
        </div>
      </div>
    </div>
  )
}


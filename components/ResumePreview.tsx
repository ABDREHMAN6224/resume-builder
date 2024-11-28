import { ResumeData, Style } from '../app/types'

interface ResumePreviewProps {
  data: ResumeData
  style: Style
}

export default function ResumePreview({ data, style }: ResumePreviewProps) {
  
  return (
    <div
      id="resume-preview"
      className="bg-white px-4 py-2 shadow-lg"
      style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        color: style.primaryColor,
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.2',
      }}
    >
      <h1 className="text-3xl font-bold mb-1">{data.fullName}</h1>
      
      <div className="text-sm mb-3">
        {data.education.degree} · {data.education.cgpa} · Expected {data.education.expectedGraduation}
        <br />
        {data.education.institution} · {data.contact.phone} · {data.contact.email}
      </div>

      <hr className="my-1"
      style={{
        color: style.secondaryColor,
        backgroundColor: style.secondaryColor,
        height: 1,
        border: 'none',
        opacity:0.7
      }}
      />

      <h2 className="text-xl font-bold uppercase mb-2">{data.title}</h2>
      <p className="mb-3 text-sm">{data.summary}</p>
      <hr className="my-1"
      style={{
        color: style.secondaryColor,
        backgroundColor: style.secondaryColor,
        height: 1,
        border: 'none',
        opacity:0.7
      }}
      />
      <div className="mb-3">
        <h3 className="text-lg font-bold uppercase mb-1">Links</h3>
        {data.links.map((link, index) => (
          <div key={index} className="text-sm">
            {link.platform}: <a href={link.url} className="text-black underline">{link.url}</a>
          </div>
        ))}
      </div>
      <hr className="my-1"
      style={{
        color: style.secondaryColor,
        backgroundColor: style.secondaryColor,
        height: 1,
        border: 'none',
        opacity:0.7
      }}
      />

      <div className="mb-3">
        <h3 className="text-lg font-bold uppercase mb-1">Skills</h3>
        <div className="grid grid-cols-4 gap-1 text-sm">
          {[...data.skills.technologies,...data.skills.frameworks,...data.skills.tools].map((skill, index) => {
            console.log(skill)
            return <div key={index}>{skill}</div>
          })}
        </div>
      </div>
      <hr className="my-1"
      style={{
        color: style.secondaryColor,
        backgroundColor: style.secondaryColor,
        height: 1,
        border: 'none',
        opacity:0.7
      }}
      />
      <div className="mb-3">
        <h3 className="text-lg font-bold uppercase mb-1">Professional Experience</h3>
        {data.experience.map((exp, index) => (
          <div key={index} className="">
            <div className="flex justify-between items-baseline">
              <span className="font-bold">{exp.company}</span>
              <span className="text-sm font-medium">{exp.duration}</span>
            </div>
            <div className="text-sm italic">
              {exp.position} {exp.type}
            </div>
            <ul className="list-none list-inside text-sm pl-4">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>- {resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="my-1"
      style={{
        color: style.secondaryColor,
        backgroundColor: style.secondaryColor,
        height: 1,
        border: 'none',
        opacity:0.7
      }}
      />

      <div className="mb-3">
        <h3 className="text-lg font-bold uppercase mb-1">Projects</h3>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="font-bold flex gap-1">{project.name}</div>
            <div className="text-sm flex flex-col items-start">
              {project.description}

              {project.link && (
                <a href={project.link} className="text-black underline">
                  {project.link}
                </a>
              )}
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}


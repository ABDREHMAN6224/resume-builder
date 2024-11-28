import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ResumeData, Experience, Project, Link } from '../app/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: Partial<ResumeData>) => void
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const handleChange = (
    section: keyof ResumeData,
    field: string,
    value: string
  ) => {
    onChange({
      ...data,
      [section]: {
        // @ts-ignore
        ...data[section],
        [field]: value
      }
    })
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperience = [...data.experience]
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    }
    onChange({ experience: newExperience })
  }

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...data.projects]
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    }
    onChange({ projects: newProjects })
  }

  const handleLinkChange = (index: number, field: keyof Link, value: string) => {
    const newLinks = [...data.links]
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    }
    onChange({ links: newLinks })
  }

  const addExperience = () => {
    onChange({
      experience: [
        ...data.experience,
        {
          company: '',
          position: '',
          type: '',
          duration: '',
          responsibilities: []
        }
      ]
    })
  }

  const addProject = () => {
    onChange({
      projects: [
        ...data.projects,
        {
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    })
  }

  const addLink = () => {
    onChange({
      links: [
        ...data.links,
        {
          platform: '',
          url: ''
        }
      ]
    })
  }

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => onChange({ summary: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={data.education.degree}
              onChange={(e) => handleChange('education', 'degree', e.target.value)}
            />
          </div>
          {/* <div>
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              value={data.education.institution}
              onChange={(e) => handleChange('education', 'institution', e.target.value)}
            />
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                value={data.education.cgpa}
                onChange={(e) => handleChange('education', 'cgpa', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="expectedGraduation">Expected Graduation</Label>
              <Input
                id="expectedGraduation"
                value={data.education.expectedGraduation}
                onChange={(e) => handleChange('education', 'expectedGraduation', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="campus">Campus</Label>
            <Input
              id="campus"
              value={data.contact.campus}
              onChange={(e) => handleChange('contact', 'campus', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.contact.phone}
              onChange={(e) => handleChange('contact', 'phone', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.contact.email}
              onChange={(e) => handleChange('contact', 'email', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.links.map((link, index) => (
            <div key={index} className="space-y-2">
              <Input
                placeholder="Platform (e.g., LinkedIn)"
                value={link.platform}
                onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
              />
              <Input
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={addLink}>Add Link</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={data.skills.technologies.join(', ')}
              onChange={(e) => onChange({ skills: { ...data.skills, technologies: e.target.value.split(',').map(s => s.trim()) } })}
            />
          </div>
          <div>
            <Label>Frameworks (comma-separated)</Label>
            <Input
              value={data.skills.frameworks.join(', ')}
              onChange={(e) => onChange({ skills: { ...data.skills, frameworks: e.target.value.split(',').map(s => s.trim()) } })}
            />
          </div>
          <div>
            <Label>Tools (comma-separated)</Label>
            <Input
              value={data.skills.tools.join(', ')}
              onChange={(e) => onChange({ skills: { ...data.skills, tools: e.target.value.split(',').map(s => s.trim()) } })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Experience (oldest first)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                />
              </div>
              <div>
                <Label>Type (Remote/Onsite)</Label>
                <Input
                  value={exp.type}
                  onChange={(e) => handleExperienceChange(index, 'type', e.target.value)}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                />
              </div>
              <div>
                <Label>Responsibilities (one per line)</Label>
                <Textarea
                  value={exp.responsibilities.join('\n')}
                  onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value.split('\n'))}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addExperience}>Add Experience</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div>
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label>Technologies Used</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                />
              </div>
              <div>
                <Label>Link</Label>
                <Input
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addProject}>Add Project</Button>
        </CardContent>
      </Card>
    </form>
  )
}



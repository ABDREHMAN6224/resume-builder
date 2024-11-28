export interface Education {
    degree: string
    institution: string
    cgpa: string
    expectedGraduation: string
  }
  
  export interface Experience {
    company: string
    position: string
    type: string // e.g., "(Remote)", "(Onsite)"
    duration: string
    responsibilities: string[]
  }
  
  export interface Project {
    name: string
    description: string
    technologies: string
    link?: string
  }
  
  export interface Link {
    platform: string
    url: string
  }
  
  export interface ResumeData {
    fullName: string
    education: Education
    contact: {
      campus: string
      phone: string
      email: string
    }
    title: string
    summary: string
    links: Link[]
    skills: {
      technologies: string[]
      frameworks: string[]
      tools: string[]
    }
    experience: Experience[]
    projects: Project[]
  }
  
  export interface Style {
    fontFamily: string
    primaryColor: string
    secondaryColor: string
    fontSize: string
  }
  
  
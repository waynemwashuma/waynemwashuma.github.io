export class Education {
  timeline: string = ''
  institute: string = ''
  qualification: string = ''
  description: string = ''
  constructor(qualification = '', institute = '', timeline = '', description = '') {
    this.qualification = qualification
    this.institute = institute
    this.timeline = timeline
    this.description = description
  }

  static deserialize(data: any): Education | undefined {
    const project = new Education()
    if (!(data instanceof Object)) return
    if (typeof data.institute === "string") {
      project.institute = data.institute
    }

    if (typeof data.description === "string") {
      project.description = data.description
    }

    if (typeof data.timeline === "string") {
      project.timeline = data.timeline
    }

    if (typeof data.qualification === "string") {
      project.qualification = data.qualification
    }

    return project
  }
}

export class User {
  name: string = ''
  about: string = ''
  location: string = ''
  image: string = 'images/avatars/default-inverted.jpg'
  skills: string[] = []
  education: Education[] = []
  projects: Project[] = []
  static deserialize(data: any): User | undefined {
    const user = new User()
    if (!(data instanceof Object)) return
    if (typeof data.name === "string") {
      user.name = data.name
    }

    if (typeof data.about === "string") {
      user.about = data.about
    }

    if (typeof data.location === "string") {
      user.location = data.location
    }

    if (typeof data.image === "string") {
      user.image = data.image
    }

    if (data.skills instanceof Array) {
      for (let i = 0; i < data.skills.length; i++) {
        const skillData = data.skills[i];
        const skill = (typeof skillData === "string") ? skillData as string : null

        if (skill) {
          user.skills.push(skill)
        }
      }
    }

    if (data.projects instanceof Array) {
      for (let i = 0; i < data.projects.length; i++) {
        const projectData = data.projects[i];
        const project = Project.deserialize(projectData)

        if (project) {
          user.projects.push(project)
        }
      }
    }

    if (data.education instanceof Array) {
      for (let i = 0; i < data.education.length; i++) {
        const educationData = data.education[i];
        const education = Education.deserialize(educationData)

        if (education) {
          user.education.push(education)
        }
      }
    }
    return user
  }
}

export class Project {
  name: string = ''
  category: string = ''
  description: string = ''
  image: string = 'images/avatars/default-inverted.jpg'
  link: string = ''

  static deserialize(data: any): Project | undefined {
    const project = new Project()
    if (!(data instanceof Object)) return
    if (typeof data.name === "string") {
      project.name = data.name
    }

    if (typeof data.description === "string") {
      project.description = data.description
    }

    if (typeof data.image === "string") {
      project.image = data.image
    }

    if (typeof data.link === "string") {
      project.link = data.link
    }

    if (typeof data.category === "string") {
      project.category = data.category
    }

    return project
  }
}
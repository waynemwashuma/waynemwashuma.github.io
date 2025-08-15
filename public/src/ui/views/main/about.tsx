export function About() {
  const skills = [
    "Frontend development",
    "Backend development",
    "Game development",
    "CI/CD automation"
  ]
  const education = [
    new Education(
      "Certificate of Software Engineering",
      "Modcom Institute of Technology",
      "2022",
      "Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi" +
      "cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident" +
      "cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet" +
      "est occaecat nisi."
    ),
    new Education(
      "Bachelors of Software Engineering",
      "Multimedia University of Kenya",
      "2023-2027",
      "Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi" +
      "cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident" +
      "cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet" +
      "est occaecat nisi."
    )
  ]
  return (
    <>
      <div className="row about-info wide" data-animate-block>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img src="images/avatars/default-inverted.jpg" alt="an avatar image." className="about-info__pic" data-animate-el />
        </div>

        <div className="column lg-6 md-12">
          <div className="about-info__text">
            <h2 className="text-pretitle with-line" data-animate-el>
              About
            </h2>
            <p className="attention-getter" data-animate-el>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>

      <div className="row about-expertise" data-animate-block>
        <div className="column lg-12">

          <h2 className="text-pretitle" data-animate-el>Expertise</h2>

          <ul className="skills-list h1" data-animate-el>
            {
              skills.map((skill) => {
                return <li key={skill}>{skill}</li>
              })
            }
          </ul>

        </div>
      </div>

      <div className="row about-timelines" data-animate-block>
        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Education
          </h2>
          <div className="timeline" data-animate-el>
            {education.map((e) => {
              return <EducationCard education={e} key={e.qualification}/>
            })}

          </div>
        </div>
      </div>
    </>
  )
}

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
}

export function EducationCard({education}:{education:Education}) {
  return (
    <div className="timeline__block">
      <div className="timeline__bullet"></div>
      <div className="timeline__header">
        <h4 className="timeline__title">{education.institute}</h4>
        <h5 className="timeline__meta">{education.qualification}</h5>
        <p className="timeline__timeframe">{education.timeline}</p>
      </div>
      <div className="timeline__desc">
        <p>{education.description}</p>
      </div>
    </div>
  )
}
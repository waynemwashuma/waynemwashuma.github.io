import { useContext } from "react"
import { Education } from "../../../common/index.ts"
import { userContext } from "../../store.tsx"

export function About() {
  const {skills,education,about,image} = useContext(userContext)
  
  return (
    <>
      <div className="row about-info wide" data-animate-block>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img src={image} alt="an avatar image." className="about-info__pic" data-animate-el />
        </div>

        <div className="column lg-6 md-12">
          <div className="about-info__text">
            <h2 className="text-pretitle with-line" data-animate-el>
              About
            </h2>
            <p className="attention-getter" data-animate-el>
              {about}
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
import { useContext } from "react"
import { userContext } from "../../store.tsx"

export function About() {
  const {skills,about,image} = useContext(userContext)
  
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
    </>
  )
}

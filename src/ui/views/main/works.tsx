import { useContext } from "react";
import { ProjectItem } from "../../components/index.tsx";
import { userContext } from "../../store.tsx";
export function Works() {
  const {projects} = useContext(userContext)

  return (
    <>
      <div className="row works-portfolio">
        <div className="column lg-12" data-animate-block>
          <h2 className="text-pretitle" data-animate-el>
            Recent Projects
          </h2>
          <p className="h1" data-animate-el>
            Here are some of my projects that I have been working on lately.
          </p>

          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {
              projects.map(({ image, links, category, name, description }) => {
                return <ProjectItem
                  image={image}
                  links={links}
                  category={category}
                  name={name}
                  description={description}
                  key={name}
                />
              })}
          </ul>
        </div>
      </div>
    </>
  )
}

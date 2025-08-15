import { useEffect, useState } from "react";
import { ProjectItem } from "../../components/index.tsx";
export function Works() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("data/user.json")
      .then(res => res.json())
      .then(resData => setData(resData));
  }, [])

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
              // SAFETY: I wrote the json file
              //@ts-ignore
              data ? data.projects.map(({ image, url, category, name, description }) => {
                return <ProjectItem
                  image={image}
                  url={url}
                  category={category}
                  name={name}
                  description={description}
                  key={name}
                />
              }) : null}
          </ul>
        </div>
      </div>
    </>
  )
}
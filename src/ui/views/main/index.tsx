import { Intro } from "./intro.tsx"
import { About } from "./about.tsx"
import { Contact } from "./contact.tsx"
import { Works } from "./works.tsx"
import type { JSX } from "react"

export function Main() {
  const sections: [string, JSX.Element][] = [
    ["intro", <Intro />],
    ["about", <About />],
    ["works", <Works />],
    ["contact", <Contact />]
  ]
  return (
    <main className="s-content">
      {sections.map(([name,section]) => {
        return <section id={name} className={`s-${name} target-section`} key={name}>
          {section}
        </section>
      })}
    </main>
  )
}

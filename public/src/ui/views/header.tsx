import MoveTo from "moveto"
import { useEffect, useRef, type RefObject } from "react"
import { EaseFunctions } from "../../main.ts";

export function Header() {
  const moveTo = new MoveTo({
    tolerance: 0,
    duration: 1200,
    easing: 'easeInOutCubic',
    container: window
  }, EaseFunctions);
  const options = [
    ["Intro", "#intro"],
    ["About", '#about'],
    ["Projects", '#works'],
    ["Contact", '#contact'],
  ]

  return (
    <header className="s-header">
      <div className="header-mobile">
        <a className="mobile-menu-toggle" href="#0"><span>Menu</span></a>
      </div>

      <div className="row wide main-nav-wrap">
        <nav className="column lg-12 main-nav">
          <ul>
            {options.map(([name, url], i) => {
              const trigger:RefObject<HTMLAnchorElement | null> = useRef(null)
              useEffect(() => {
                moveTo.registerTrigger(trigger.current as HTMLElement);
              }, [])
              return (
                <li key={`nav-${i}`}>
                  <a href={url} className="smoothscroll" ref={trigger}>
                    {name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
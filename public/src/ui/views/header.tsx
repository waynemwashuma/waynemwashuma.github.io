import MoveTo from "moveto"
import { useEffect } from "react"
import { EaseFunctions } from "../../main.ts";

export function Header() {
  const options = [
    ["Intro", "#intro"],
    ["About", '#about'],
    ["Projects", '#works'],
    ["Contact", '#contact'],
  ]

  useEffect(() => {
    const moveTo = new MoveTo({
      tolerance: 0,
      duration: 1200,
      easing: 'easeInOutCubic',
      container: window
    }, EaseFunctions);

    const unregisterCallbacks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".main-nav .smoothscroll")
    ).map(trigger => moveTo.registerTrigger(trigger));

    return () => {
      unregisterCallbacks.forEach(unregister => unregister());
    };
  }, []);

  return (
    <header className="s-header">
      <div className="header-mobile">
        <a className="mobile-menu-toggle" href="#0"><span>Menu</span></a>
      </div>

      <div className="row wide main-nav-wrap">
        <nav className="column lg-12 main-nav">
          <ul>
            {options.map(([name, url], i) => (
              <li key={`nav-${i}`}>
                <a href={url} className="smoothscroll">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

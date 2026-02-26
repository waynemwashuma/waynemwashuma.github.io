import MoveTo from "moveto"
import { useEffect } from "react"
import { EaseFunctions } from "../../main.ts";

type NavItem = {
  name: string;
  url: string;
  smooth: boolean;
};

const options: NavItem[] = [
  { name: "Intro", url: "#intro", smooth: true },
  { name: "About", url: "#about", smooth: true },
  { name: "Projects", url: "#works", smooth: true },
  { name: "Blog", url: "/blog/", smooth: false },
  { name: "Contact", url: "#contact", smooth: true }
];

export function Header() {
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
            {options.map((item, i) => (
              <li key={`nav-${i}`}>
                <a href={item.url} className={item.smooth ? "smoothscroll" : undefined}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

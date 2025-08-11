import { createScope, Scope } from 'animejs';
import { useRef, useEffect, type RefObject } from "react";
import { createWebTimeline } from '../../main.ts';

export default function MainContent() {
  const root = useRef(null);
  const scope: RefObject<Scope | null> = useRef(null);
  
  useEffect(() => {
    const tl = createWebTimeline()
    scope.current = createScope({ root }).add(self => {
      if (!self) return
      window.addEventListener('load', function () {
        const element = document.querySelector('html')
        const preloader = document.querySelector('#preloader');
    
        if (!preloader) return;
        if (!element) return
        element.classList.remove('ss-preload');
        element.classList.add('ss-loaded');
    
        document.querySelectorAll('.ss-animated').forEach(function (item) {
          item.classList.remove('ss-animated');
        });
        tl.play();
      });
    });

    return () => {
      if (scope.current)
        scope.current.revert()
    }
  }, []);

  return (
    <div className="s-pagewrap" ref={root}>
      <div className="circles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <header className="s-header">
        <div className="header-mobile">
          <a className="mobile-menu-toggle" href="#0"><span>Menu</span></a>
        </div>

        <div className="row wide main-nav-wrap">
          <nav className="column lg-12 main-nav">
            <ul>
              <li className="current"><a href="#intro" className="smoothscroll">Intro</a></li>
              <li><a href="#about" className="smoothscroll">About</a></li>
              <li><a href="#works" className="smoothscroll">Projects</a></li>
              <li><a href="#contact" className="smoothscroll">Contact me</a></li>
            </ul>
          </nav>
        </div>

      </header>

      <main className="s-content">
        <section id="intro" className="s-intro target-section">
          <div className="row intro-content wide">
            <div className="column">
              <div className="text-pretitle with-line">
                Hello there.
              </div>

              <h1 className="text-huge-title">
                I am Wayne Mwashuma, <br></br>
              </h1>
              <span className=".h4">
                A full stack developer &amp; game developer
                based in <span style={{ color: "var(--accent-color-1)" }}>Nairobi, Kenya.</span>
              </span>
            </div>
          </div>

          <a href="#about" className="intro-scrolldown smoothscroll">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
              clipRule="evenodd">
              <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
            </svg>
          </a>

        </section>

        <section id="about" className="s-about target-section">
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
                <li>Frontend development</li>
                <li>Backend development</li>
                <li>Game development</li>
                <li>CI/CD automation</li>
              </ul>

            </div>
          </div>


          <div className="row about-timelines" data-animate-block>
            <div className="column lg-6 tab-12">
              <h2 className="text-pretitle" data-animate-el>
                Education
              </h2>
              <div className="timeline" data-animate-el>

                <div className="timeline__block">
                  <div className="timeline__bullet"></div>
                  <div className="timeline__header">
                    <h4 className="timeline__title">Multimedia University of Kenya</h4>
                    <h5 className="timeline__meta">Bachelors of Software Engineering</h5>
                    <p className="timeline__timeframe">2023-2027</p>
                  </div>
                  <div className="timeline__desc">
                    <p>Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi
                      cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident
                      cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet
                      est occaecat nisi.</p>
                  </div>
                </div>

                <div className="timeline__block">
                  <div className="timeline__bullet"></div>
                  <div className="timeline__header">
                    <h4 className="timeline__title">Modcom Institute of Technology</h4>
                    <h5 className="timeline__meta">Certificate of Software Engineering</h5>
                    <p className="timeline__timeframe">2022</p>
                  </div>
                  <div className="timeline__desc">
                    <p>Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi
                      cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident
                      cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet
                      est occaecat nisi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="s-works target-section">
          <div className="row works-portfolio">
            <div className="column lg-12" data-animate-block>
              <h2 className="text-pretitle" data-animate-el>
                Recent Projects
              </h2>
              <p className="h1" data-animate-el>
                Here are some of my projects that I have been working on lately.
              </p>

              <ul className="folio-list row block-lg-one-half block-stack-on-1000">
                <li className="folio-list__item column" data-animate-el>
                  <a className="folio-list__item-link" href="#modal-01">
                    <div className="folio-list__item-pic">
                      <img src="images/portfolio/gallery/wima-engine.jpg" alt="" />
                    </div>

                    <div className="folio-list__item-text">
                      <div className="folio-list__item-cat">
                        Game engine
                      </div>
                      <div className="folio-list__item-title">
                        Wima game engine.
                      </div>
                    </div>
                  </a>
                  <a className="folio-list__proj-link" href="#" title="project link">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div id="modal-01" hidden>
              <div className="modal-popup">
                <img src="images/portfolio/gallery/wima-engine.jpg" alt="" />

                <div className="modal-popup__desc">
                  <h5>Wima game engine</h5>
                  <p>
                    A HTML5 game engine written in javascript.It supports both 2d and 3d game development
                    with a multitude of plugins to help in developing games.
                  </p>
                </div>

                <a href="https://github.com/wimaengine/wima/" className="modal-popup__details">Project link</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="s-contact target-section">
          <div className="row contact-top">
            <div className="column lg-12">
              <h2 className="text-pretitle">
                Get In Touch
              </h2>

              <p className="h1">
                I would love to hear from you.
                Whether you have a question or just
                want to chat about tech — shoot me a message.
              </p>
            </div>
          </div>

          <div className="row contact-bottom">
            <div className="column lg-3 md-5 tab-6 stack-on-550 contact-block">
              <h3 className="text-pretitle">Reach me</h3>
              <p className="contact-links">
                <a href="mailto:mwashumawayne@gmail.com" className="mailtoui">Email</a> <br></br>
                <a href="tel:+254772029647">Telephone</a>
              </p>
            </div>
            <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
              <h3 className="text-pretitle">Social</h3>
              <ul className="contact-social">
                <li><a href="https://github.com/waynemwashuma">Github</a></li>
                <li><a href="https://ke.linkedin.com/in/wayne-mwashuma-878200252">LinkedIn</a></li>
              </ul>
            </div>
            <div className="column lg-4 md-12 contact-block">
              <a href="mailto:mwashumawayne@gmail.com" className="mailtoui btn btn--medium u-fullwidth contact-btn">
                Contact me.
              </a>
            </div>
          </div>

        </section>
      </main>

      <footer className="s-footer">
        <div className="row">
          <div className="column ss-copyright">
            <span>© Wayne Mwashuma 2024-present</span>
          </div>

          <div className="ss-go-top">
            <a className="smoothscroll" title="Back to Top" href="#top">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
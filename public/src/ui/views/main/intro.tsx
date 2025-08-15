export function Intro() {
  return (
    <>
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
    </>
  )
}
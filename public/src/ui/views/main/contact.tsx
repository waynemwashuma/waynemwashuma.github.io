export function Contact() {
  return (
    <>
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
            <a href="mailto:mwashumawayne@gmail.com" className="mailtoui">Email</a> <br />
            <a href="tel:+254772029647">Telephone</a>
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="contact-social">
            <li><a href="https://github.com/waynemwashuma" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="https://ke.linkedin.com/in/wayne-mwashuma-878200252" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a href="mailto:mwashumawayne@gmail.com" className="mailtoui btn btn--medium u-fullwidth contact-btn">
            Contact me.
          </a>
        </div>
      </div>
    </>
  )
}
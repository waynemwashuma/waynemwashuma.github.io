import { useContext } from "react";
import { userContext } from "../../store.tsx";

export function Contact() {
  const { email, phone, socials } = useContext(userContext);
  const hasEmail = email.trim().length > 0;
  const hasPhone = phone.trim().length > 0;
  const availableSocials = socials.filter(({ name, url }) => name.trim() && url.trim());

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
            {hasEmail ? <><a href={`mailto:${email}`} className="mailtoui">Email</a> <br /></> : null}
            {hasPhone ? <a href={`tel:${phone}`}>Telephone</a> : null}
            {!hasEmail && !hasPhone ? "No contact details available." : null}
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="contact-social">
            {availableSocials.length ? availableSocials.map(({ name, url }) => (
              <li key={`${name}-${url}`}>
                <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
              </li>
            )) : (
              <li>No social links available.</li>
            )}
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a href={hasEmail ? `mailto:${email}` : "#contact"} className="mailtoui btn btn--medium u-fullwidth contact-btn">
            Contact me.
          </a>
        </div>
      </div>
    </>
  )
}

import type { ProjectLink } from "../../common/index.ts";
import { ProjectLinkIcon } from "./projectLinkIcon.tsx";

export function ModalItem({ image, name, links, description }: ModalItemOptions) {
  return (
      <div className="modal-popup">
        <div className="modal-popup__media">
          <img src={image} alt={name} />
        </div>

        <div className="modal-popup__desc">
          <div className="modal-links-list">
            {links.map((link) => {
              return (
                <a
                  key={`${link.url}-${link.name}`}
                  href={link.url}
                  className="modal-popup__details"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="modal-popup__icon" aria-hidden="true">
                    <ProjectLinkIcon link={link} className="modal-popup__icon-svg" />
                  </span>
                  {link.name || "Project link"}
                </a>
              )
            })}
          </div>
          <h5>{name}</h5>
          <p>
            {description}
          </p>
        </div>
      </div>
  )
}

export type ModalItemOptions = {
  name: string
  links: ProjectLink[]
  description: string
  image: string
}

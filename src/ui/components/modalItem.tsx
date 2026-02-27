import type { ProjectLink } from "../../common/index.ts";

export function ModalItem({ image, name, links, description }: ModalItemOptions) {
  return (
      <div className="modal-popup">
        <img src={image} alt="" />

        <div className="modal-popup__desc">
          <h5>{name}</h5>
          <p>
            {description}
          </p>
        </div>
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
                {link.imageUrl ? <img src={link.imageUrl} alt="" /> : null}
                {link.name || "Project link"}
              </a>
            )
          })}
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
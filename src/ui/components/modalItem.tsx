import type { ProjectLink } from "../../common/index.ts";

export function ModalItem({ image, name, links, description }: ModalItemOptions) {
  return (
    <div id="modal-01">
      <div className="modal-popup">
        <img src={image} alt="" />

        <div className="modal-popup__desc">
          <h5>{name}</h5>
          <p>
            {description}
          </p>
        </div>
        {links.map((link)=>{
          return (
          <a href={link.url} className="modal-popup__details">
            {link.imageUrl ? <img src={link.imageUrl} alt="" /> : null}
            {link.name || "Project link"}
          </a>
        )
        })
        }
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

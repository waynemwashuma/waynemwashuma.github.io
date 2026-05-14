import { useState } from "react";
import { Modal } from "./modal";
import { ModalItem } from "./modalItem.tsx";
import { createPortal } from "react-dom";
import type { ProjectLink } from "../../common/index.ts";
import { ProjectLinkIcon } from "./projectLinkIcon.tsx";
export function ProjectItem({
  image,
  name,
  links,
  category,
  description
}: ProjectItemOptions) {
  const [initModal,setModal] = useState(false)
  const primaryLink = links[0]

  const modalitem = <ModalItem name={name} description={description} links={links} image={image}/>
  const modal = <Modal onClose={()=>setModal(false)}>{modalitem}</Modal>
  const portal = createPortal(modal,document.body)
  return (
    <>
    {initModal?portal:null}
      <li className="folio-list__item column" data-animate-el>
        <a className="folio-list__item-link" onClick={()=>setModal(true)}>
          <div className="folio-list__item-pic">
            <img src={image} alt="" />
          </div>

          <div className="folio-list__item-text">
            <div className="folio-list__item-cat">
              {category}
            </div>
            <div className="folio-list__item-title">
              {name}
            </div>
          </div>
        </a>
        {primaryLink ? (
          <a
            className="folio-list__proj-link"
            href={primaryLink.url}
            title={primaryLink.name || "project link"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProjectLinkIcon link={primaryLink} className="folio-list__proj-link-icon" />
          </a>
        ) : null}
      </li>
    </>
  )
}

export type ProjectItemOptions = {
  image: string
  name: string
  links: ProjectLink[]
  category: string
  description: string
}

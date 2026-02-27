import { useState } from "react";
import { Modal } from "./modal";
import { ModalItem } from "./modalItem.tsx";
import { createPortal } from "react-dom";
import type { ProjectLink } from "../../common/index.ts";
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
        <a className="folio-list__item-link" href="#modal-01" onClick={()=>setModal(true)}>
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
        <a className="folio-list__proj-link" href={primaryLink?.url || "#"} title={primaryLink?.name || "project link"} target="_blank">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </a>
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

export function ModalItem({ image, name, url, description }: ModalItemOptions) {
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

        <a href={url} className="modal-popup__details">Project link</a>
      </div>
    </div>
  )
}

export type ModalItemOptions = {
  name: string
  url: string
  description: string
  image: string
}
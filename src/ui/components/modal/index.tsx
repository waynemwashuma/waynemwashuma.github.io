import { useState } from "react"

export function Modal({ children,onClose }: ModalOptions) {
  const [open, setOpen] = useState(true)

  function close() {
    setOpen(false)
    onClose()
  }
  if (!open) {
    return null
  }
  return (
    <div className="modal" onClick={close}>
      <div className="modal__dialog" onClick={e=>e.stopPropagation()}>
        <button className="modal__back" type="button" onClick={close}>
          Back
        </button>
        {children}
      </div>
    </div>
  )
}

export type ModalOptions = {
  children: any
  isOpen?: boolean
  onClose:()=>void
}

import { useState, type CSSProperties } from "react"

export const style: CSSProperties = {
  zIndex: 100,
  width: "100vw",
  height: "100vh",
  background: "black",
  position: "fixed",
  top: "0px",
  left: "0px"
}
const modalItemStyle: CSSProperties = {
  position:"absolute",
  top: "50%",
  left: "50%",
  transform:"translate(-50%,-50%)",
  backgroundColor:"red",
  width:"fit-content",
  height:"fit-content"
}

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
    <div style={style} className="modal" onClick={close}>
      <div style={modalItemStyle} onClick={e=>e.stopPropagation()}>
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
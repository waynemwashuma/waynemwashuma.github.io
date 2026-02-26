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
  width:"fit-content"
}

export function Modal({ children,isOpen = true }: ModalOptions) {
  const [open, setOpen] = useState(isOpen)

  function close() {
    setOpen(false)
  }
  if (!open) {
    return <></>
  }
  return (
    <div style={style} className="modal" onClick={close}>
      <div style={modalItemStyle}>
        {children}
      </div>
    </div>
  )
}

export type ModalOptions = {
  children: any
  isOpen?: boolean
}
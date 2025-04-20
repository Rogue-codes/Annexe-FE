import { ReactNode } from "react"

interface IModalWrapper {
    children:ReactNode
}
export default function ModalWrapper({children}:IModalWrapper) {
  return (
    <div className='fixed left-0 w-full z-[99999999889] top-0 h-screen bg-[#0501017c] flex justify-center items-center'>
        {children}
    </div>
  )
}

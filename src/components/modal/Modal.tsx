// Modal.tsx
import React, { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: ReactNode
  children: ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
    onClick={onClose}
  >
      <div className="bg-[#FFF] w-full max-w-md h-full overflow-y-auto lg:h-full shadow-lg rounded-xl flex justify-between flex-col"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center border-stroke border-b px-5 py-[22px]">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose}>
            <IoMdClose className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col justify-between max-h-full h-full">{children}</div>
      </div>
    
    </div>
  )
}

export default Modal

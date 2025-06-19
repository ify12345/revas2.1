import React from 'react'
import logo from '@/assets/images/load.png'

interface LoaderProps {
  visible: boolean
}

export default function Loader({ visible }: LoaderProps) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <img
        src={logo}
        alt="Loading..."
        className="w-[50px] h-[50px] animate-pulse"
      />
    </div>
  )
}

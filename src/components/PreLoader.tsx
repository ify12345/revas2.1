import React from 'react'

export default function PreLoader() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="flex justify-center items-center h-full w-full z-10 relative">
        <img
          className="max-w-[50px] duration-100 animate-bounce"
          src="/src/assets/images/favicon.png"
          alt="favicon icon"
        />
      </div>
    </div>
  )
}

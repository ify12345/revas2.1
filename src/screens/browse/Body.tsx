import React from 'react'
import img from '@/assets/images/browse.png'

export default function Body() {
  return (
    <div className='mt-2 lg:mt-[75px] px-5 lg:px-[60px] text-center lg:text-start'>
      <p className="lg:text-6xl font-medium mb-2 lg:mb-[57px]">
        Browse Categories
      </p>
      <p className="gradient-text text-2xl lg:text-4xl mb-[51px]">
        Looking for Materials? Browse by type:
      </p>
      <div className="rounded-2xl bg-[#FAFAFA] flex flex-col lg:flex-row justify-center gap-[42px] p-8 mb-[84px]">
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="flex items-center text-3xl font-medium justify-between w-full">
            <p>Plastic</p> <span className="cursor-pointer">+</span>
          </div>
          <div className="flex items-center text-3xl font-medium justify-between w-full">
            <p>Paper</p> <span className="cursor-pointer">+</span>
          </div>
          <div className="flex items-center text-3xl font-medium justify-between w-full">
            <p>Metal</p> <span className="cursor-pointer">+</span>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  )
}

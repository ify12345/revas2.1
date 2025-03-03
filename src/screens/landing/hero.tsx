import * as React from 'react'
import recycles from "@/assets/images/recycles.png";


export default function Hero(){
  return (
    <>
    <div className="relative bg-primary shadow-2xl">
    {/* Main Content */}
    <div className="relative z-30 max-w-[735px] w-full justify-center items-center flex flex-col mx-auto gap-3 text-white pt-[78px]">
      <p className="text-6xl text-center">
        Global B2B Procurement Platform for Recyclables
      </p>
      <p className="text-base text-center">
        We Make Buying and Selling Recyclable Materials as Easy as the Click of a Button
      </p>
      <a
        href="/sign-up"
        className="py-[12px] px-[30px] border border-white rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
      >
        GET STARTED
      </a>
    </div>
  </div>
    <img  src={recycles} className="relative max-w-full md:mt-32 lg:-mt-[520px] z-10 shadow-2xl" alt="hero_image" />
    </>
  
  )
}


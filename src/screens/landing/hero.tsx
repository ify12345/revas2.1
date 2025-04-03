import * as React from 'react'
import recyclesVideo from '@/assets/images/recycles.mp4'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <>
      <div className="relative bg-primary shadow-2xl">
        {/* Main Content */}
        <div className="relative z-30 max-w-[735px] w-full justify-center items-center flex flex-col mx-auto gap-3 text-white pt-[78px] px-5 lg:px-0">
          <p className="text-3xl lg:text-6xl text-center">
            Global B2B Procurement Platform for Recyclables
          </p>
          <p className="text-base text-center">
            We Make Buying and Selling Recyclable Materials as Easy as the Click
            of a Button
          </p>
          <Link
            to="/sign-up"
            className="py-[12px] px-[30px] border border-white rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            GET STARTED
          </Link>
        </div>
      </div>

      <div className="relative -mt-[220px]  lg:-mt-[900px] z-10 ">
        <video className="w-full shadow-2xl " autoPlay muted>
          <source src={recyclesVideo} type="video/mp4" />
        </video>
      </div>
    </>
  )
}

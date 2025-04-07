import React from 'react'
import image from '@/assets/images/about.png'
import ab1 from '@/assets/images/ab1.png'
import ab2 from '@/assets/images/ab2.png'
import ab3 from '@/assets/images/ab3.png'


export default function Body() {
  return (
    <div className="mt-2 lg:mt-[75px] px-5 lg:px-[60px]">
      <p className="lg:text-6xl font-semibold mb-2 lg:mb-[57px]">
        Every great solution starts with a problem
      </p>
      <img src={image} alt="" />

      <div className="flex flex-col lg:flex-row justify-between py-[51px] text-center lg:text-start">
        <div className="lg:w-1/2 text-primary text-center lg:text-start lg:text-4xl font-medium lg:max-w-[549px]">
          At Revas, ours began in the recycling yards and procurement offices{' '}
          <span className="text-purple">
            where our founders spent most of their waking hours
          </span>
        </div>
        <div className="lg:w-1/2 flex flex-col lg:max-w-[602px] gap-5">
          <p className="text-primary">
            Day after day, we watched businesses struggle with the same
            challenges: endless back and forth emails, quality issues that only
            surfaced after delivery, delayed payments, and endless paperwork.
          </p>
          <p className='text-foundationBlack'>
            In an age where you can order a meal with a single tap, why was
            buying and selling recyclable materials so tedious?
          </p>
          <p className='text-foundationBlack'>This question became our mission.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[29px]">
        <div className="w-full">
            <img src={ab1} className='w-full object-cover' alt="" />
        </div>
        <div className="w-full">
            <img src={ab2} className='w-full object-cover' alt="" />
        </div>
        <div className="w-full">
            <img src={ab3} className='w-full object-cover' alt="" />
        </div>
      </div>
    </div>
  )
}

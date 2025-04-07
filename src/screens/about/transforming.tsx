import React from 'react'
import t1 from '@/assets/images/t1.png'
import t2 from '@/assets/images/t2.png'
import t3 from '@/assets/images/t3.png'

export default function Transforming() {
  return (
    <div className="bg-[#f6f6f6] py-[144px] text-center lg:text-start px-5 lg:px-0 space-y-[85px]">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[135px] justify-center">
        <div className="max-w-[426px] lg:text-7xl">
          Join Us in
          <span className='gradient-text'>Transforming the Industry</span>
        </div>
        <div className="max-w-[426px] flex flex-col justify-between text-blackLight gap-3 items-end mt-5">
          <p>
            Ready to experience material procurement and recycling the way it
            should be?
          </p>
          <p>
            Join the growing number of businesses that trust Revas to handle
            their material needs.
          </p>
          <p>
            Together, we're not just making transactions easier—we're making the
            sustainable choice the obvious choice.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
        <img src={t1} className='w-full object-cover h-full rounded-2xl' alt="" />
        <img src={t2} className='w-full object-cover h-full rounded-2xl' alt="" />
        <img src={t3} className='w-full object-cover h-full rounded-2xl' alt="" />
      </div>
    </div>
  )
}

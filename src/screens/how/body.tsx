import React from 'react'
import image from '@/assets/images/how.png'
import GoArrow from '@/components/svg/GoArrow'
import ticket from '@/assets/images/ticket.png'
import { Link } from 'react-router-dom'
import ShieldSvg from '@/components/svg/Shield'
import LawSvg from '@/components/svg/Law'
import LogisticSvg from '@/components/svg/Logistics'

export default function Body() {
  return (
    <div className="mt-2 lg:mt-[75px] px-5 lg:px-[60px] text-center lg:text-start">
      <p className="lg:text-6xl font-medium mb-2 lg:mb-[57px] max-w-[680px]">
        Buy and sell recyclable materials easily.
      </p>
      <img src={image} alt="" />

      <div className="flex flex-col lg:flex-row justify-between py-[51px] text-center lg:text-start">
        <div className="lg:w-1/2 text-foundationBlack text-center lg:text-start lg:text-4xl font-medium lg:max-w-[549px]">
          Here's how our platform works from
          <span className="text-primary">start to finish</span>
        </div>
        <div className="lg:w-1/2 flex flex-col lg:max-w-[602px] gap-5"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-[116px] pb-2 lg:pb-[105px]">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex items-center gap-1">
            <p>01</p>
            <span className="h-[0.5px] bg-primaryLight w-[10px]"></span>
            <p className="text-primaryLight">05</p>
          </div>
          <div className="flex justify-between w-full">
            <p className=" lg:text-3xl">Sign Up and Register</p>
            <GoArrow />
          </div>
          <p className="text-foundationBlack lg:text-3xl">One-click-Order</p>
          <p className="text-foundationBlack lg:text-3xl">Material Sourcing</p>
          <p className="text-foundationBlack lg:text-3xl">
            Digital Signature for Secure Transactions
          </p>
          <p className="text-foundationBlack lg:text-3xl">
            Logistics and Delivery
          </p>
        </div>
        <div className="w-full lg:w-1/2 border border-[#e2e8f0] rounded-2xl">
          <img src={ticket} alt="" />
          <div className="p-[32px] flex-col flex gap-3 items-center lg:items-start">
            <p>
              Create an account in minutes to start sourcing or selling
              materials
            </p>
            <Link
              to="/sign-up"
              className="py-2 px-6 border w-fit border-white rounded-lg text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-2 lg:gap-[116px] py-2 lg:py-[101px] items-center lg:items-start">
        <div className="w-full lg:w-1/2">
          <p className="max-w-[544px] gradient-text text-2xl lg:text-4xl">
            Quality Control & Deal Management
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-[42px]">
          <div className="flex flex-col gap-5 items-center lg:items-start">
            <ShieldSvg />
            <p className="text-xl">Supplier Verification</p>
            <p className="text-blackLight font-light">
              All suppliers are verified to ensure they meet industry standards
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center lg:items-start">
            <LawSvg />
            <p className="text-xl">Material Quality Checks</p>
            <p className="text-blackLight font-light">
              We provide detailed descriptions and specifications for every
              material
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center lg:items-start">
            <LogisticSvg />
            <p className="text-xl">Logistics Monitoring</p>
            <p className="text-blackLight font-light">
              Real-time tracking for every transaction and delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

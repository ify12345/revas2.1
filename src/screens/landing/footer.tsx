import * as React from 'react'
import dashbaord from '@/assets/images/dashboard.png'
import elipse from '@/assets/images/elipse.png'
import logo from '@/assets/images/logo-white.png'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className="relative flex flex-col lg:flex-row text-white bg-primary items-center px-5 py-6 lg:py-0 lg:px-0">
        <div className="relative lg:pl-[64px] space-y-2 lg:space-y-[54px] lg:w-1/2">
          <p className="max-w-[600px] text-2xl lg:text-5xl">
            Manage Your Orders from a Centralized Dashboard
          </p>
          <div className="flex gap-4">
            <Link
              to="/sign-up"
              className="py-[12px] px-[30px] border border-purple rounded-lg capitalize text-sm font-medium text-white bg-purple transition-colors duration-300 hover:text-primary hover:bg-white"
            >
              GET STARTED
            </Link>
            <Link
              to="/sign-in"
              className="py-[12px] px-[30px] border border-white rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-white hover:bg-purple"
            >
              SIGN IN
            </Link>
          </div>
        </div>

        <div className="relative lg:w-1/2">
          <img
            src={elipse}
            alt=""
            className="w-full absolute -left-[50%] top-40"
          />
          <img
            src={dashbaord}
            alt=""
            className="flex justify-end items-end w-full relative  mt-[126px]"
          />
        </div>
      </div>
      <div className="flex items-center bg-primary py-[23px] px-5 lg:px-[64px] gap-2 lg:gap-[192px]">
        <img src={logo} className="max-w-[172px] w-full" alt="Logo" />
        <p className="text-sm text-[#8F9FA3] text-center lg:text-start">
          © 2025 — Copyright All Rights reserved
        </p>
      </div>
    </>
  )
}
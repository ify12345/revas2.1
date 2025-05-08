import * as React from 'react'
import CustomInput from './CustomInput'
import { SlCloudUpload } from 'react-icons/sl'

export default function CompanyProfile() {
  return (
    <div className="">
      <div className="flex justify-between mt-6">
        <p className="text-lg ">Company Profile</p>
        <button className="bg-primary rounded-lg py-2 px-4 text-white">
          update
        </button>
      </div>
      <p className="text-sm text-primaryLight border-stroke border-b pb-6 mb-6">
        Keep your company details up to date in Revas so that we can keep your
        deals moving quickly.
      </p>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full">
          <p>Company Name</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput placeholder="name" />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full flex flex-col">
          <p>Brand logo</p>
          <p className="text-primaryLight">
            This will be displayed on your profile
          </p>
        </div>
        <div className="lg:w-[60%] w-full flex gap-5 items-center">
          <div className="bg-[#D9D9D9] size-[100px] rounded-full "></div>
          <div className="rounded-lg border border-dashed border-stroke flex flex-col gap-1 py-[16px] justify-center items-center px-[55px] text-sm font-extralight cursor-pointer">
            <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center p-4">
              <SlCloudUpload />
            </div>
            <p>
              Click to upload{' '}
              <span className="text-gray_light">or drag and drop</span>
            </p>
            <p className="text-[#B3B3B3]">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Products</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput placeholder="products" />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Capacity (MT/month)</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput placeholder="800" />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Location</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput placeholder="United Kingdom" />
        </div>
      </div>
    </div>
  )
}

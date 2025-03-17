import * as React from 'react'
import img1 from '@/assets/images/1.png'
import img2 from '@/assets/images/2.png'
import img3 from '@/assets/images/3.png'
import img4 from '@/assets/images/4.png'
import img5 from '@/assets/images/5.png'
import img6 from '@/assets/images/6.png'
import img7 from '@/assets/images/7.png'
import img8 from '@/assets/images/8.png'
import review from '@/assets/images/review.png'
import { Link } from 'react-router-dom'

export default function Body() {
  return (
    <div className="">
      <div className="max-auto flex flex-col justify-center items-center gap-[60px] mt-[183px]">
        <p className="text-xl font-light text-center">
          Trusted by key partners in the recycling industry
        </p>
        <div className="flex flex-col lg:flex-row items-center w-full justify-between px-7 lg:px-[143px]">
          <img src={img1} className="max-w-[110px]" alt="Logo" />
          <img src={img2} className="max-w-[58px]" alt="Logo" />
          <img src={img3} className="max-w-[58px]" alt="Logo" />
          <img src={img4} className="max-w-[58px]" alt="Logo" />
          <img src={img5} className="max-w-[58px]" alt="Logo" />
          <img src={img6} className="max-w-[58px]" alt="Logo" />
          <img src={img7} className="max-w-[58px]" alt="Logo" />
          <img src={img8} className="max-w-[58px]" alt="Logo" />
        </div>
      </div>

      <div className="bg-custom-image flex flex-col lg:flex-row mx-4 lg:mx-[62px]  rounded-[32px] my-[123px]">
        <div className="flex flex-col p-2 lg:p-[58px]">
          <div className="max-w-[369px] w-full text-6xl font-bold">
            Get Started in Minutes
          </div>
          <p className="pl-2 lg:pl-[38px] border-l-2 border-[#5B4397] text-2xl font-[500] max-w-[349px] mt-[30px] mb-[24px]">
            Instant Connection to Your Account Manager
          </p>
          <p className="text-base text-[#475569] pl-[38px] max-w-[480px]">
            Chat with us on WhatsApp and get connected instantly to an account
            manager. We are here to help you finalize deals quickly and
            efficiently, ensuring a smooth experience.
          </p>
          <p className="pl-2 lg:pl-[38px] text-2xl font-[500]  mt-[30px] mb-[24px]">
            Track Your Orders in Real-Time
          </p>
          <p className="text-base text-[#475569] pl-[38px] max-w-[480px]">
            Stay updated every step of the way! With our real-time tracking, you
            can monitor your orders effortlessly and control the entire process.
          </p>
          <p className="pl-2 lg:pl-[38px] text-2xl font-[500]  mt-[30px] mb-[24px]">
            Seamless Order Management
          </p>
          <p className="text-base text-[#475569] pl-[38px] max-w-[480px]">
            Our web app is designed for your convenience! Track, manage, and
            finalize orders directly from your dashboard easily.
          </p>

          <Link
            to="/sign-up"
            className="py-[12px] w-fit mx-[38px] mt-[81px] px-[30px] border rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            GET STARTED
          </Link>
        </div>

        <img src={review} className="max-w-[879px]" alt="Logo" />
      </div>
    </div>
  )
}

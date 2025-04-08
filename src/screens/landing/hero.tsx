import * as React from 'react'
import recyclesVideo from '@/assets/images/recycles.mp4'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '@/components/variants'

export default function Hero() {
  return (
    <>
      <div className="relative bg-primary shadow-2xl">
        {/* Main Content */}
        <div className="relative z-30 max-w-[735px] w-full justify-center items-center flex flex-col mx-auto gap-3 text-white pt-[78px] px-5 lg:px-0">
          <motion.p
            variants={fadeIn('down', 0.5)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: true, amount: 0.7 }}
            className="text-3xl lg:text-6xl text-center"
          >
            Global B2B Procurement Platform for Recyclables
          </motion.p>
          <motion.p
            variants={fadeIn('down', 0.5)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: true, amount: 0.7 }}
            className="text-base text-center"
          >
            We Make Buying and Selling Recyclable Materials as Easy as the Click
            of a Button
          </motion.p>
          <Link
            to="/sign-up"
            className="py-[12px] px-[30px] border border-white rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            GET STARTED
          </Link>
        </div>
      </div>

      <div className="relative -mt-[220px] lg:-mt-[700px]  2xl:-mt-[900px] z-10 ">
        <video className="w-full shadow-2xl " autoPlay muted>
          <source src={recyclesVideo} type="video/mp4" />
        </video>
      </div>
    </>
  )
}

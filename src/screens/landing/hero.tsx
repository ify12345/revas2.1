import * as React from 'react'
import recyclesVideo from '@/assets/images/recycles.mp4'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <>
      <div className="relative bg-primary shadow-2xl">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-30 max-w-[735px] w-full justify-center items-center flex flex-col mx-auto gap-3 text-white pt-[78px] px-5 lg:px-0"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl lg:text-6xl text-center"
          >
            Global B2B Procurement Platform for Recyclables
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
        </motion.div>
      </div>

      <div className="relative -mt-[220px] lg:-mt-[700px]  2xl:-mt-[900px] z-10 ">
        <video className="w-full shadow-2xl " autoPlay muted>
          <source src={recyclesVideo} type="video/mp4" />
        </video>
      </div>
    </>
  )
}

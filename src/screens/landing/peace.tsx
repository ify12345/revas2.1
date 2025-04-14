import * as React from 'react'
import card1 from '@/assets/images/card1.png'
import card2 from '@/assets/images/card2.png'
import card3 from '@/assets/images/card3.png'
import { useSlantingCards } from '@/components/hooks/useSlantingCards'


export default function Peace() {
  const { setCardRef } = useSlantingCards();

  return (
    <>
      <div className="relative flex flex-col text-black bg-[#F6F6F6] px-5 py-6 lg:py-[192px] lg:px-[222px] lg:gap-[83px]">
        <div className="">
          <p className="max-w-[662px] text-2xl lg:text-7xl">
            Your peace of mind is
            <span className="gradient-text text-2xl lg:text-7xl">
              our commitment
            </span>
          </p>
        </div>
        {/* images will be here  */}
        <div className="container">
          <ul id="cards">
            <li className="card" id="card1" ref={(el) => setCardRef(el, 0)}>
              <img src={card1} className="w-full card-body" alt="" />
            </li>
            <li className="card" id="card2" ref={(el) => setCardRef(el, 1)}>
              <img src={card2} className="w-full card-body" alt="" />
            </li>
            <li className="card" id="card3" ref={(el) => setCardRef(el, 2)}>
              <img src={card3} className="w-full card-body" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
// scale and reveal in motion animation
{
  /* <motion.div
initial={{
  opacity:0
}}
whileInView={{
  opacity:1,
  scale: 1.25,
  transition: {
    duration: 3
  }
}}
class */
}

import dt1 from '@/assets/images/dt1.png'
import dt2 from '@/assets/images/dt2.png'
import dt3 from '@/assets/images/dt3.png'
import React from 'react'

export default function Detail() {
  return (
    <div className="mt-[225px] px-5 lg:px-[60px] text-center lg:text-start">
      <div className="flex flex-col lg:flex-row justify-between gap-[42px] py-[42px] border-b border-stroke">
        <div className="flex w-full gap-[12px] justify-between max-w-[380px]">
          <p className="size-[12px] bg-primary rounded-full mt-1" />
          <p className="uppercase max-w-[200px] text-blackLight">
            From Challenge to Innovation
          </p>
          <span className="h-[0.5px] bg-primary w-[140px] mt-2"></span>
        </div>
        <div className="gap-[42px] flex-col flex">
          <p className="lg:text-4xl">
            <span className="text-foundationBlack">
              We started Revas with a simple belief:{' '}
            </span>
            buying and selling recyclable materials should be as easy as any
            other business transaction.
          </p>
          <div className="flex flex-col lg:flex-row gap-[56px]">
            <div className="w-full max-w-[359px]">
              <img src={dt1} className="w-full object-cover" alt="" />
            </div>
            <div className="space-y-3 flex flex-col justify-between max-w-[489px]">
              <p className="text-blackLight">
                Our team knew exactly what to do because we'd lived through
                these challenges ourselves.
              </p>
              <p className="text-blackLight">
                What began as a mission to simplify recycling has evolved into
                something bigger. Today, Revas is transforming how businesses
                handle material procurement and recycling.
              </p>
              <p className="text-blackLight">
                We've built a platform that turns hours of work into minutes,
                uncertainty into confidence, and complexity into simplicity
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-[42px] py-[42px] border-b border-stroke">
        <div className="flex w-full gap-[12px] justify-between max-w-[380px]">
          <p className="size-[12px] bg-primary rounded-full mt-1" />
          <p className="uppercase max-w-[200px] text-blackLight">
            What Sets Us Apart
          </p>
          <span className="h-[0.5px] bg-primary w-[140px] mt-2"></span>
        </div>
        <div className="gap-[42px] flex-col flex">
          <p className="lg:text-4xl">
            <span className="text-foundationBlack">
              Our strength comes from
            </span>
            understanding both sides of every transaction.
          </p>
          <div className="flex flex-col lg:flex-row gap-[56px]">
            <div className="w-full max-w-[359px]">
              <img src={dt2} className="w-full object-cover" alt="" />
            </div>
            <div className="space-y-3 flex flex-col justify-between max-w-[489px]">
              <p className="text-blackLight">
                Today, Revas serves businesses across the globe. We handle
                everything from small recycling transactions to major
                procurement contracts.
              </p>
              <p className="text-blackLight">
                But we're just getting started. Our vision extends beyond just
                buying and selling. We're building a future where sustainable
                materials are accessible to everyone.
              </p>
              <p className="text-blackLight">
                Every feature we add, service we launch, and partnership we
                build brings us closer to this vision.
              </p>
              <p className="text-blackLight">
                Whether you're looking to buy materials, sell recyclables, or
                both, you'll find a partner in Revas who understands your
                challenges and is committed to your success
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[42px] py-[42px] border-b border-stroke">
        <div className="flex w-full gap-[12px] justify-between max-w-[380px]">
          <p className="size-[12px] bg-primary rounded-full mt-1" />
          <p className="uppercase max-w-[200px] text-blackLight">
            The Future We're Building
          </p>
          <span className="h-[0.5px] bg-primary w-[140px] mt-2"></span>
        </div>
        <div className="gap-[42px] flex-col flex">
          <p className="lg:text-4xl">
            <span className="text-foundationBlack">Revas serves</span>
            businesses across the globe.
          </p>
          <div className="flex flex-col lg:flex-row gap-[56px]">
            <div className="w-full max-w-[359px]">
              <img src={dt3} className="w-full object-cover" alt="" />
            </div>
            <div className="space-y-3 flex flex-col justify-between max-w-[489px]">
              <p className="text-blackLight">
                We know what buyers need to feel confident in their purchases.
                We understand what sellers need to move their materials.
              </p>
              <p className="text-blackLight">
                And we've built solutions that serve both.
              </p>
              <ul className="text-blackLight list-disc">
                <li>
                  <span className="text-primary">Industry Expertise:</span> Our
                  team brings hands-on experience in recycling and material
                  procurement.
                </li>
                <li>
                  <span className="text-primary">
                    Trust Through Transparency:
                  </span>{' '}
                  Enjoy complete visibility at every step of the process.
                </li>
                <li>
                  <span className="text-primary">
                    Commitment to Sustainability:
                  </span>{' '}
                  Environmental responsibility is at the core of all our
                  operations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

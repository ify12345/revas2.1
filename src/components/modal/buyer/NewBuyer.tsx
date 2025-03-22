import CustomInput from '@/components/CustomInput'
import * as React from 'react'
import { useState } from 'react'
import buyerImg from '@/assets/images/buyer.png'
import buyerEllipse from '@/assets/images/ellipse.png'
interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewBuyer: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const [isSecondView, setIsSecondView] = useState(false)

  if (!isOpen) return null

  const handleCreate = () => {
    setIsSecondView(true)
  }

  const BuyerForm = () => (
    <div className="">
      <div className="p-4 border-b border-stroke flex items-center gap-4">
        <h2 className="text-lg font-semibold">New Buyer</h2>
        <h2 className="text-sm font-semibold text-violet">New Client</h2>
      </div>
      <form
        method=""
        className="border border-stroke p-5 rounded-lg mx-3 mt-6 gap-4 flex-col flex"
      >
        <CustomInput
          label="Company Name"
          value="Revas Exchange"
          type={''}
          placeholder={''} name={''}        />
        <CustomInput
          label="Company Name"
          value=""
          type={'email'}
          placeholder={''} name={''}        />
        <div className="flex flex-col text-[#98A2B3] gap-2">
          <label htmlFor="buyer">Location</label>
          <select id="buyer" className="border border-stroke p-2 rounded-lg">
            <option value="">United Kingdom</option>
          </select>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-1">
          <div className="flex flex-col text-[#98A2B3] w-full">
            <label htmlFor="buyer">Product</label>
            <select
              id="buyer"
              className="border border-stroke rounded-lg py-[10px] w-full"
            >
              <option value="">Product</option>
            </select>
          </div>
          <CustomInput
            label="Capacity (MT)"
            value=""
            type={''}
            placeholder={''} name={''}          />
          <CustomInput
            label="Price/tonne (USD)"
            value=""
            type={''}
            placeholder={''} name={''}          />
        </div>

        <div className="flex flex-col text-[#98A2B3] gap-2">
          <label htmlFor="buyer">Shipping Type</label>
          <select id="buyer" className="border border-stroke p-2 rounded-lg">
            <option value="">Shipping Type</option>
          </select>
        </div>
        <div className="flex flex-col text-[#98A2B3] gap-2">
          <label htmlFor="buyer">Supplier</label>
          <select id="buyer" className="border border-stroke p-2 rounded-lg">
            <option value="">Shipping Type</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <CustomInput
            label="Supplier Price"
            value="100"
            type={''}
            placeholder={''} name={''}          />
          <CustomInput
            label="Shipping Cost"
            value="200"
            type={''}
            placeholder={''} name={''}          />
        </div>
      </form>
    </div>
  )

  const SecondView = () => (
    <div className="rounded-lg  m-1 gap-4 flex-col flex">
      <div className="relative">
        <img src={buyerImg} className="h-[15%] w-full" alt="" />
        <img
          src={buyerEllipse}
          className="rounded-full border-[#ffff] top-16 size-[120px] left border-3 absolute z-50"
          alt=""
        />
        <button className="border border-stroke text-gray px-3 py-2 flex ml-auto rounded-lg mt-2">
          View orders
        </button>
      </div>
      <div className="border-b-[0.4px] border-stroke py-1 flex flex-col text-gray px-[14px] gap-4 pb-3">
        <div className="flex flex-col gap-2">
          <p className="text-gray font-bold">EcoPET Solutions</p>
          <p className="font-light text-sm">
            62, Buckingham Street, Azel Road, Switzerland
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="border-r border-stroke pr-3 flex flex-col gap-1">
            <p className="text-sm font-light">Client Type</p>
            <p className="text-base font-medium">Buyer</p>
          </div>
          <div className="border-r border-stroke px-3 flex flex-col gap-1">
            <p className="text-sm font-light">Total Transaction</p>
            <p className="text-base font-medium">$23,876.00</p>
          </div>
          <div className=" flex flex-col gap-1 pl-3">
            <p className="text-sm font-light ">Monthly Capacity</p>
            <p className="text-base font-medium">$23,876.00</p>
          </div>
        </div>
      </div>
      <div className="px-[14px] flex flex-col gap-2">
        <CustomInput
          label="Company Name"
          value="Revas Exchange"
          type={''}
          placeholder={''} name={''}        />
        <CustomInput
          label="Email"
          value="recycle@revas.com"
          type={'email'}
          placeholder={''} name={''}        />
        <div className="flex flex-col text-[#98A2B3] gap-2">
          <label htmlFor="buyer">Product</label>
          <select id="buyer" className="border border-stroke py-[10px] px-2 rounded-lg">
            <option value="">Product</option>
            <option value="buyer1">Buyer 1</option>
            <option value="buyer2">Buyer 2</option>
          </select>
        </div>
        <CustomInput
          label="Capacity (MT)"
          value=""
          type={''}
          placeholder={''} name={''}        />
        <div className="flex flex-col text-[#98A2B3] gap-2 ">
              <label htmlFor="buyer">Product</label>
              <select
                id="buyer"
                className="border border-stroke py-[10px] px-2 rounded-lg"
              >
                <option value="">Location</option>
                <option value="buyer1">Buyer 1</option>
                <option value="buyer2">Buyer 2</option>
              </select>
            </div>
      </div>
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF] w-full max-w-md h-full overflow-y-auto lg:h-full shadow-lg rounded-xl flex justify-between flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="">{isSecondView ? <SecondView /> : <BuyerForm />}</div>

        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg"
          >
            {isSecondView ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewBuyer

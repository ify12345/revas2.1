import * as React from 'react'
import CustomInput from '../CustomInput'

interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF] w-full max-w-md h-full shadow-lg rounded-xl flex justify-between flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="">
          <div className="p-4 border-b border-stroke">
            <h2 className="text-lg font-semibold">Create Order</h2>
          </div>
          <form
            method=""
            className="border border-stroke p-5 rounded-lg mx-3 mt-6 gap-4 flex-col flex"
          >
            <CustomInput
              label="Company Name"
              value="Revas Exchange"
              type={''}
              placeholder={''}
            />
            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Product</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Product</option>
                <option value="buyer1">Buyer 1</option>
                <option value="buyer2">Buyer 2</option>
              </select>
            </div>
            <CustomInput
              label="Capacity (MT)"
              value=""
              type={''}
              placeholder={''}
            />
            <CustomInput
              label="Price/tonne (USD)"
              value="500"
              type={''}
              placeholder={''}
            />
            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Product</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Location</option>
                <option value="buyer1">Buyer 1</option>
                <option value="buyer2">Buyer 2</option>
              </select>
            </div>
            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Select Supplier</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Product</option>
                <option value="buyer1">Buyer 1</option>
                <option value="buyer2">Buyer 2</option>
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Save as Draft
          </button>
          <button className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg">
            Create Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderModal

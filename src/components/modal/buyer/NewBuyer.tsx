import CustomInput from '@/components/CustomInput'
import * as React from 'react'

interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

const NewBuyer: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF] w-full max-w-md h-full shadow-lg rounded-xl flex justify-between flex-col"
        onClick={e => e.stopPropagation()}
      >
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
              placeholder={''}
            />
            <CustomInput
              label="Company Name"
              value=""
              type={'email'}
              placeholder={''}
            />
            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Location</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Product</option>
                <option value="buyer1">Buyer 1</option>
                <option value="buyer2">Buyer 2</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex flex-col text-[#98A2B3] w-full">
                <label htmlFor="buyer">Product</label>
                <select
                  id="buyer"
                  className="border border-stroke  rounded-lg py-[10px] w-full"
                >
                  <option value="">Product</option>
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
                value=""
                type={''}
                placeholder={''}
              />
            </div>

            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Shipping Type</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Shipping Type</option>
              </select>
            </div>
            <div className="flex flex-col text-[#98A2B3] gap-2">
              <label htmlFor="buyer">Supplier</label>
              <select
                id="buyer"
                className="border border-stroke p-2 rounded-lg"
              >
                <option value="">Shipping Type</option>
              </select>
            </div>
            <div className="flex items-center">
              <CustomInput
                label="Supplier Price"
                value="100"
                type={''}
                placeholder={''}
              />
              <CustomInput
                label="Shipping Cost"
                value="200"
                type={''}
                placeholder={''}
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Cancel
          </button>
          <button className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewBuyer

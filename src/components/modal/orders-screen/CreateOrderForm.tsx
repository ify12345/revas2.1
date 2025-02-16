/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomInput from '@/components/CustomInput'
import * as React from 'react'
import { useState } from 'react'
import buyerImg from '@/assets/images/buyer.png'
import buyerEllipse from '@/assets/images/ellipse.png'
import { FiPlus } from 'react-icons/fi'
import CelebrateSvg from '@/components/svg/Celebrate'
interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
}
interface SearchHistoryItem {
  id: number
  name: string
}

const CreateOrderForm: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSecondView, setIsSecondView] = useState(false)
  const [modalTitle, setModalTitle] = useState<React.ReactNode>('')
  const [searchHistory] = useState<SearchHistoryItem[]>([
    { id: 1, name: 'Previous Company 1' },
    { id: 2, name: 'Previous Company 2' },
    { id: 3, name: 'Previous Company 3' },
  ])

  const [buyerPrice, setBuyerPrice] = useState(0)
  const [supplierPrice, setSupplierPrice] = useState(0)
  const [freightCost, setFreightCost] = useState(0)
  const [otherCosts, setOtherCosts] = useState(0)
  const [profitMargin, setProfitMargin] = useState<number | null>(null)

  const calculateProfitMargin = () => {
    const totalCost = supplierPrice + freightCost + otherCosts
    const profit = buyerPrice - totalCost
    const margin = (profit / buyerPrice) * 100

    setProfitMargin(margin)
  }
  React.useEffect(() => {
    calculateProfitMargin()
    
  }, [buyerPrice, supplierPrice, freightCost, otherCosts])

  if (!isOpen) return null

  const handleCreate = () => {
    setIsSecondView(true)
  }
  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const handleCreateNewBuyer = () => {
    setModalTitle(
      <div className="flex items-center gap-4">
        <span className="text-[#7255BD]">New Client</span>
      </div>
    )
    setShowDropdown(false)
  }

  const handleSelectCompany = (company: string) => {
    // Handle company selection
    setShowDropdown(false)
  }
  const BuyerForm = () => (
    <div className="bg-white p-5 rounded-lg ">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stroke pb-3">
        <h2 className="text-lg font-semibold">Create Order</h2>
        <h2 className="text-sm font-semibold text-violet">{modalTitle}</h2>
      </div>

      {/* Form */}
      <form className="mt-4 flex flex-col gap-4">
        {/* Buyer Name */}
        <CustomInput
          label="Company Name"
          value="Revas Exchange"
          type="text"
          placeholder="Enter company name"
          onFocus={handleInputFocus}
        />

        {/* Dropdown for Search History */}
        {showDropdown && (
          <div className="relative mt-1 bg-white border border-stroke rounded-md shadow-lg">
            {searchHistory.map(item => (
              <div
                key={item.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray"
                onClick={() => setShowDropdown(false)}
              >
                {item.name}
              </div>
            ))}
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray_light border-t flex items-center"
              onClick={handleCreateNewBuyer}
            >
              <FiPlus color="#98a2b3" /> Create New Buyer
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex flex-col text-gray">
          <label htmlFor="location">Location</label>
          <select id="location" className="border border-stroke p-2 rounded-lg">
            <option value="">United Kingdom</option>
          </select>
        </div>

        {/* Product & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex flex-col text-gray_light gap-1 text-sm">
            <label htmlFor="product">Product</label>
            <select
              id="product"
              className="border border-stroke py-[12px] px-2 rounded-lg"
            >
              <option value="">Select Product</option>
            </select>
          </div>
          <CustomInput
            label="Capacity (MT)"
            value=""
            type="number"
            placeholder="Enter capacity"
          />
          <CustomInput
            label="Price/tonne (USD)"
            value=""
            type="number"
            placeholder="Enter price per tonne"
          />
        </div>

        {/* Shipping Type */}
        <div className="flex flex-col text-gray">
          <label htmlFor="shippingType">Shipping Type</label>
          <select
            id="shippingType"
            className="border border-stroke p-2 rounded-lg"
          >
            <option value="">Select Shipping Type</option>
          </select>
        </div>

        {/* Supplier */}
        <div className="flex flex-col text-gray">
          <label htmlFor="supplier">Supplier</label>
          <select id="supplier" className="border border-stroke p-2 rounded-lg">
            <option value="">Select Supplier</option>
          </select>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <CustomInput
            label="Buyer's Price"
            value={buyerPrice}
            type="number"
            placeholder="Enter Buyer's Price"
            onChange={e => setBuyerPrice(Number(e.target.value))}
          />
          <CustomInput
            label="Supplier Price"
            value={supplierPrice}
            type="number"
            placeholder="Enter Supplier Price"
            onChange={e => setSupplierPrice(Number(e.target.value))}
          />
          <CustomInput
            label="Freight Cost"
            value={freightCost}
            type="number"
            placeholder="Enter Freight Cost"
            onChange={e => setFreightCost(Number(e.target.value))}
          />
        </div>

        {/* Other Costs */}
        <CustomInput
          label="Other Costs (USD)"
          value={otherCosts}
          type="number"
          placeholder="Enter Other Costs"
          onChange={e => setOtherCosts(Number(e.target.value))}
        />

        <div className="border border-stroke px-4 py-4 rounded-lg  flex gap-3">
          <CelebrateSvg/>
          <div className="flex flex-col">
            <p className="text-primary">
              You're in the Green!{' '}
              {profitMargin !== null && (
                <span
                  className={`text-sm font-semibold mt-2 ${
                    profitMargin < 0
                      ? 'text-danger'
                      : profitMargin >= 5
                        ? 'text-success'
                        : 'text-success'
                  }`}
                >
                  {profitMargin.toFixed(2)}%
                </span>
              )}
            </p>
            <p className="text-gray_light text-sm">You can proceed with this transaction</p>
          </div>
        </div>


        <div className="border border-stroke bg-[#efefef] px-4 py-4 rounded-lg  flex flex-col gap-1">
          <div className="flex justify-between items-center text-gray_light text-sm w-full">
            <p className="text-primary font-bold">Franko Recycling</p>
            <button>x</button>
          </div>
          <p>Price:<span className='text-success font-bold text-md'>$800</span></p>
          <div className="flex items-center justify-between w-full text-gray_light text-sm">
            <p>Capacity: <span className='text-primary'>100</span></p>
            <p>Account Manager: <span className='text-primary'>Odili wisdom</span></p>
          </div>
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
          placeholder={''}
        />

        <CustomInput
          label="Email"
          value="recycle@revas.com"
          type={'email'}
          placeholder={''}
        />
        <div className="flex flex-col text-[#98A2B3] gap-2">
          <label htmlFor="buyer">Product</label>
          <select
            id="buyer"
            className="border border-stroke py-[10px] px-2 rounded-lg"
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
            {isSecondView
              ? 'Save Changes'
              : profitMargin !== null && profitMargin < 0
                ? 'Loss Detected'
                : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderForm

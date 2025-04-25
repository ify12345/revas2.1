import * as React from 'react'
import Success from '../svg/success'
import Badge from '../Badge'

interface Person {
  id: string
  name: string
  status: React.JSX.Element
  price: string
  country: string
  capacity: string
  grade: string
  supplier: string
}

interface RowDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  data: Person | null
}

const RowDetailsModal: React.FC<RowDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [selectedBuyer, setSelectedBuyer] = React.useState<string>('')
  const [showCheckbox, setShowCheckbox] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [price, setPrice] = React.useState('')
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Check if all fields are filled
  const isFormComplete = selectedBuyer && isChecked && price.trim() !== ''

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
        <div>
          <div className="p-4 border-b border-stroke flex justify-between items-center">
            <h2 className="text-lg font-normal">{data?.supplier}</h2>
          </div>

          {/* Success Message Screen */}
          {isSuccess ? (
            <div className="m-4">
              <div className="flex flex-col justify-center items-center">
                <Success />
                <h2 className="text-2xl font-semibold text-green-600">
                  Congratulations!
                </h2>
                <p className="text-gray mt-2">Your order has been created.</p>
              </div>
              <div className="border border-stroke p-5 rounded-lg text-center mt-6 gap-4 flex-col flex">
                <div className="flex justify-between w-full">
                  <p className="text-gray">Account Manager (Buyer)</p>
                  <p className="text-primary"> Odili wisdom</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-gray">Capacity</p>
                  <p className="text-primary">850-900</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-gray">Account Manager (Buyer)</p>
                  <p className="text-primary">Clear PET Flakes</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-gray">Price/tonne (USD)</p>
                  <p className="text-primary">$750</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-gray">Country</p>
                  <p className="text-primary">Australia</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-gray">Status</p>
                  <Badge orderId="" status="matched" />
                </div>
              </div>
            </div>
          ) : (
            <div className="m-4 border border-stroke p-2 rounded-lg">
              {data ? (
                <div className="text-[#000] space-y-4">
                  <p className="w-full flex justify-between">
                    <span className="text-[#98A2B3]">Account Manager:</span>{' '}
                    {data.name}
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="text-[#98A2B3]">Price/tonne (USD):</span>{' '}
                    {data.price}
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="text-[#98A2B3]">Country:</span>{' '}
                    {data.country}
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="text-[#98A2B3]">Capacity (MT/month):</span>{' '}
                    {data.capacity}
                  </p>

                  {/* Dropdown */}
                  <div className="flex flex-col text-[#98A2B3] gap-2">
                    <label htmlFor="buyer">Select Buyer</label>
                    <select
                      id="buyer"
                      className="border border-stroke p-2 rounded-lg"
                      value={selectedBuyer}
                      onChange={e => {
                        setSelectedBuyer(e.target.value)
                        setShowCheckbox(!!e.target.value) // Show checkbox if a value is selected
                        setIsChecked(false) // Reset checkbox state when a new option is selected
                        setPrice('') // Reset price field
                      }}
                    >
                      <option value="">Select buyer</option>
                      <option value="buyer1">Buyer 1</option>
                      <option value="buyer2">Buyer 2</option>
                    </select>
                  </div>

                  {/* Checkbox (appears when dropdown is selected) */}
                  {showCheckbox && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="confirm"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="rounded cursor-pointer border-gray-300 text-primary shadow-sm focus:ring-primary"
                      />
                      <label htmlFor="confirm" className="text-primary">
                        Negotiate Price
                      </label>
                    </div>
                  )}

                  {/* Input field (appears when checkbox is checked) */}
                  {isChecked && (
                    <div>
                      <label htmlFor="price" className="text-primary">
                        Price/tonne (USD)
                      </label>
                      <input
                        type="text"
                        id="price"
                        className="border border-stroke p-2 rounded-lg w-full focus:ring-primary focus:border-primary text-primary"
                        placeholder="800"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Reject
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isFormComplete
                ? 'bg-primary text-[#fff]'
                : 'bg-[#737373] text-[#fff] cursor-not-allowed'
            }`}
            disabled={!isFormComplete}
            onClick={() => setIsSuccess(true)}
          >
            {isFormComplete ? 'Send' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RowDetailsModal


import React, { useState } from 'react'
import Modal from '../Modal'

import { editOrder } from '@/api/order'
import { useAppDispatch } from '@/redux/store'

import CustomInput from '@/components/CustomInput'
import { Order } from '@/types/apiResponse'
import { showToast } from '@/components/Toast'

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  person: Order
}

interface Payload {
  id: string
  formatData: Order[]
}

const OrderDetails = ({ isOpen, onClose, person }: OrderDetailsProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    supplierName: person.supplierName,
    product: person.product,
    pricePerTonne: person.pricePerTonne,
    location: person.location,
    status: person.status,
    capacity: person.capacity,
  })

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true)
    const payload: Payload = {
      id: person.id,
      ...formData,
      formatData: [],
    }
    dispatch(editOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        onClose()
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
      })
      .catch(err => {
        setLoading(false)
        onClose()
        const errorMessage = err?.msg.message || err?.response?.data?.detail
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Order">
      <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Company Name"
            type="text"
            name="companyName"
            value={formData.supplierName}
            onChange={handleChange}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Product"
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Price/Tonne (USD)"
            type="number"
            name="pricePerTonne"
            value={formData.pricePerTonne}
            onChange={handleChange}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Status"
            type="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
         
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-[#050505] text-[#ffff] py-[10px] px-[12px] rounded-[8px] w-full"
        >
          {loading ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

export default OrderDetails

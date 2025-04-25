/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import Modal from '../Modal'

import { editOrder } from '@/api/order'
import { useAppDispatch } from '@/redux/store'

import CustomInput from '@/components/CustomInput'
import { Order } from '@/types/apiResponse'
import { showToast } from '@/components/Toast'
import Success from '@/components/svg/success'

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
    console.log(payload)
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
    <Modal isOpen={isOpen} onClose={onClose} title="Order request">
      <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
        {
          person.status === 'matched' && (
            <div className='flex flex-col justify-center items-center gap-2 mx-auto text-sm'>
              <Success/>
              <p className='text-2xl font-medium text-primary'>Congratulations</p>
              <p>Your order has been matched</p>
              

            </div>
          )
        }
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

        <div className="flex justify-end pl-5 gap-3 border-t border-stroke py-3 items-end">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            cancel
          </button>
          <button onClick={handleSubmit} className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg">
            {
                  person.status === 'matched' ? ' Generate po' : 'Edit request'
            }
           
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetails

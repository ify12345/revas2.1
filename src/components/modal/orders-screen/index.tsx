/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { showToast } from '@/components/Toast'
import { createOrder, getOrder, saveOrder } from '@/api/order'
import { CreateOrderPayload } from '@/types/api'
import BuyerForm from './BuyerForm'
import OrderSummaryView from './OrderSummaryView'
import { CreateOrderModalProps, OrderFormData } from './types'
import Loader from '@/components/Loader'

const CreateOrderForm: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSecondView, setIsSecondView] = useState(false)
  const [modalTitle, setModalTitle] = useState<React.ReactNode>('')
  const user = useAppSelector(state => state.auth)
  const modalRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<OrderFormData>({
    buyerName: '',
    buyerId: '',
    email: user.user.email,
    buyerLocation: '',
    supplierLocation: '',
    supplierId: '',
    product: '',
    capacity: '',
    pricePerTonne: '',
    shippingType: '',
    supplierName: '',
    buyerPrice: 0,
    supplierPrice: 0,
    freightCost: 0,
    otherCosts: 0,
    negotiatePrice: true,
    priceRange: 800,
    paymentTerms: '',
    savedStatus: 'confirmed',
  })

  const resetForm = () => {
    setFormData({
      buyerName: '',
      buyerId: '',
      email: user.user.email,
      buyerLocation: '',
      supplierLocation: '',
      supplierId: '',
      product: '',
      capacity: '',
      pricePerTonne: '',
      shippingType: '',
      supplierName: '',
      buyerPrice: 0,
      supplierPrice: 0,
      freightCost: 0,
      otherCosts: 0,
      negotiatePrice: true,
      priceRange: 800,
      paymentTerms: '',
      savedStatus: 'confirmed',
    })
    setProfitMargin(null)
    setIsSecondView(false)
  }

  const [profitMargin, setProfitMargin] = useState<number | null>(null)

  // Handle clicking outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation()
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const calculateProfitMargin = () => {
    const buyerPrice = Number(formData.buyerPrice)
    const supplierPrice = Number(formData.supplierPrice)
    const freightCost = Number(formData.freightCost)
    const otherCosts = Number(formData.otherCosts)

    const totalCost = supplierPrice + freightCost + otherCosts
    const profit = buyerPrice - totalCost
    const margin = (profit / buyerPrice) * 100

    setProfitMargin(margin)
  }

  useEffect(() => {
    calculateProfitMargin()
  }, [
    formData.buyerPrice,
    formData.supplierPrice,
    formData.freightCost,
    formData.otherCosts,
  ])

  if (!isOpen) return null

  const handleCreate = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isSecondView) {
      // Handle the final form submission
      handleSubmit()
    } else {
      setIsSecondView(true)
    }
  }

  const handleSubmit = () => {
    // Prepare the payload
    const payload: CreateOrderPayload = {
      buyerName: formData.buyerName,
      buyerId: formData.buyerId,
      supplierId: formData.supplierId,
      // email: formData.email,
      buyerLocation: formData.buyerLocation,
      supplierLocation: formData.supplierLocation,
      product: formData.product,
      capacity: Number(formData.capacity),
      pricePerTonne: Number(formData.pricePerTonne),
      supplierName: formData.supplierName,
      supplierPrice: Number(formData.supplierPrice),
      shippingCost: Number(formData.freightCost),
      shippingType: formData.shippingType,
      paymentTerms: Number(formData.paymentTerms),
      negotiatePrice: formData.negotiatePrice,
      priceRange: Number(formData.priceRange),
      savedStatus: formData.savedStatus,
    }

    console.log('Order payload:', payload)

    setLoading(true)

    dispatch(createOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        // console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        dispatch(getOrder({}))
        onClose()
        resetForm()
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'

        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleSave = () => {
    // Prepare the payload
    const payload: CreateOrderPayload = {
      buyerName: formData.buyerName,
      buyerId: formData.buyerId,
      supplierId: formData.supplierId,
      // email: formData.email,
      buyerLocation: formData.buyerLocation,
      supplierLocation: formData.supplierLocation,
      product: formData.product,
      capacity: Number(formData.capacity),
      pricePerTonne: Number(formData.pricePerTonne),
      supplierName: formData.supplierName,
      supplierPrice: Number(formData.supplierPrice),
      shippingCost: Number(formData.freightCost),
      shippingType: formData.shippingType,
      paymentTerms: Number(formData.paymentTerms),
      negotiatePrice: formData.negotiatePrice,
      priceRange: Number(formData.priceRange),
      savedStatus: formData.savedStatus,
    }

    // console.log('Order payload:', payload)
    setLoading(true)
    console.log(payload)

    dispatch(saveOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        onClose()
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'

        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.stopPropagation()
    setShowDropdown(true)
  }

  const handleCreateNewBuyer = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalTitle(
      <div className="flex items-center gap-4">
        <span className="text-[#7255BD]">New Client</span>
      </div>
    )
    setShowDropdown(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-[#FFF] w-full max-w-md h-full overflow-y-auto lg:h-full shadow-lg rounded-xl flex justify-between flex-col"
        onClick={handleModalClick}
      >
        <div className="">
          {isSecondView ? (
            <OrderSummaryView
              formData={formData}
              user={user}
              save={handleSave}
            />
          ) : (
            <BuyerForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleInputFocus={handleInputFocus}
              profitMargin={profitMargin}
              modalTitle={modalTitle}
              user={user}
            />
          )}
        </div>

        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            onClick={e => {
              e.stopPropagation()
              // onClose()
              setIsSecondView(false)
            }}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : isSecondView
                ? 'Save Changes'
                : profitMargin !== null && profitMargin < 0
                  ? 'Loss Detected'
                  : 'Create Order'}
          </button>
        </div>
      </div>
      <Loader visible={loading} />
    </div>
  )
}

export default CreateOrderForm

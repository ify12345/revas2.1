/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import Modal from '../Modal'

import { editOrder, generateOrder, getOrder } from '@/api/order'
import { useAppDispatch, useAppSelector } from '@/redux/store'

import CustomInput from '@/components/CustomInput'
import { Order } from '@/types/apiResponse'
import { showToast } from '@/components/Toast'
import Success from '@/components/svg/success'
import PdfViewer from '@/components/PdfViewer'

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  person: Order
}

const OrderDetails = ({ isOpen, onClose, person }: OrderDetailsProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [documentLoading, setDocumentLoading] = useState(false)
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  const { user } = useAppSelector(state => state.auth)
  const { generateOrder: generatedOrderDoc } = useAppSelector(
    state => state.order
  )

  const [formData, setFormData] = useState({
    supplierName: person.supplierName,
    product: person.product,
    pricePerTonne: person.pricePerTonne,
    location: person.location,
    status: person.status,
    capacity: person.capacity,
  })
  // console.log(person)
  // Reset document URL when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Only reset URL if not showing the PDF viewer
      if (!showPdfViewer) {
        setDocumentUrl(null)
      }
    }
  }, [isOpen, showPdfViewer])

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle PDF generation via API
  const handleGenerateDocument = () => {
    setDocumentLoading(true)

    const payload = {
      id: person.id,
    }

    dispatch(generateOrder(payload))
      .unwrap()
      .then(response => {
        setDocumentLoading(false)

        // Show success message
        showToast({ type: 'success', msg: response.message })
         dispatch(getOrder({}))
        // Extract document URL from response
        let docUrl = null

        // Check for different possible response structures
        if (response?.data?.docUrl) {
          docUrl = response.data.docUrl
        } else if (response?.document?.url) {
          docUrl = response.document.url
        }

        // Save document URL to state for preview
        if (docUrl) {
          setDocumentUrl(docUrl)
        }
      })
      .catch(err => {
        setDocumentLoading(false)

        // Show error message
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'
        showToast({
          type: 'error',
          msg: errorMessage,
        })

        console.error('Error generating document:', err)
      })
  }

  // Open PDF preview and close modal
  const handlePreviewDocument = () => {
    const urlToUse = documentUrl || person.docUrl
    if (urlToUse) {
      setDocumentUrl(urlToUse)
      setShowPdfViewer(true)
      onClose()
    }
  }

  // Close PDF viewer
  const handleClosePdfViewer = () => {
    setShowPdfViewer(false)
  }

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true)
    const payload = {
      id: person.id,
      ...formData,
    }

    dispatch(editOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        onClose()
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
         dispatch(getOrder({}))
      })
      .catch(err => {
        setLoading(false)
        onClose()
        const errorMessage =
          err?.msg?.message ||
          err?.response?.data?.detail ||
          'An error occurred'
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  return (
    <>
      {/* Full-screen PDF Viewer */}
      {showPdfViewer && documentUrl && (
        <PdfViewer url={documentUrl} onClose={handleClosePdfViewer} />
      )}

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Order request">
        <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
          {person.status === 'matched' ||
            (person.status === 'document_phase' && (
              <div className="flex flex-col justify-center items-center gap-2 mx-auto text-sm">
                <Success />
                <p className="text-2xl font-medium text-primary">
                  Congratulations
                </p>
                <p>Your order has been matched</p>
              </div>
            ))}

          <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Company Name"
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              disabled={person.status === 'matched'}
            />
          </div>
          <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Product"
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              disabled={person.status === 'matched'}
            />
          </div>
          <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Price/Tonne (USD)"
              type="number"
              name="pricePerTonne"
              value={formData.pricePerTonne}
              onChange={handleChange}
              disabled={person.status === 'matched'}
            />
          </div>
          {/* <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={person.status === 'matched'}
            />
          </div> */}
          <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Capacity"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              disabled={person.status === 'matched'}
            />
          </div>

          {person.status !== 'matched' && (
            <div className="text-sm flex flex-col w-full justify-between">
              <CustomInput
                label="Status"
                type="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
          )}
          {/* Additional Information */}
          {!user?.clientType && (
            <div className="text-sm flex flex-col w-full gap-4 pt-4 border-t border-stroke mt-4">
              {/* Buyer Info */}
              <div>
                <h3 className="font-semibold text-[#333] mb-2">
                  Buyer Information
                </h3>
                <p>
                  <strong>Name:</strong> {person.buyer?.firstName}{' '}
                  {person.buyer?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {person.buyer?.email}
                </p>
                <p>
                  <strong>Company:</strong> {person.buyerName}
                </p>
                <p>
                  <strong>Location:</strong> {person.buyerLocation}
                </p>
              </div>

              {/* Supplier Info */}
              <div>
                <h3 className="font-semibold text-[#333] mb-2">
                  Supplier Information
                </h3>
                <p>
                  <strong>Name:</strong> {person.supplier?.firstName}{' '}
                  {person.supplier?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {person.supplier?.email}
                </p>
                <p>
                  <strong>Company:</strong> {person.supplierName}
                </p>
                <p>
                  <strong>Location:</strong> {person.supplierLocation}
                </p>
              </div>

              {/* Buyer Account Manager */}
              <div>
                <h3 className="font-semibold text-[#333] mb-2">
                  Buyer Account Manager
                </h3>
                <p>
                  <strong>Name:</strong> {person.buyerAccountManager?.firstName}{' '}
                  {person.buyerAccountManager?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {person.buyerAccountManager?.email}
                </p>
              </div>

              {/* Supplier Account Manager */}
              <div>
                <h3 className="font-semibold text-[#333] mb-2">
                  Supplier Account Manager
                </h3>
                <p>
                  <strong>Name:</strong>{' '}
                  {person.supplierAccountManager?.firstName}{' '}
                  {person.supplierAccountManager?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {person.supplierAccountManager?.email}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end  gap-3 border-t border-stroke py-3 items-end">
            <button
              onClick={onClose}
              className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg text-sm transition-all duration-300 hover:scale-95"
            >
              Cancel
            </button>

            {/* Show Preview button when document URL is available */}
            {documentUrl ||
              (person.docUrl && (
                <button
                  onClick={handlePreviewDocument}
                  className="bg-[#3b82f6] text-[#FFF] px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-95"
                >
                  Preview Document
                </button>
              ))}

            {!user.clientType && !person.docUrl && (
              <button
                onClick={
                  person.status === 'matched' ||
                  person.status === 'document_phase'
                    ? handleGenerateDocument
                    : handleSubmit
                }
                disabled={loading || documentLoading}
                className="bg-[#000] text-[#FFF] px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-95"
              >
                {loading || documentLoading
                  ? 'Processing...'
                  : person.status === 'matched' ||
                      person.status === 'document_phase'
                    ? `Generate ${user?.role === 'buyer' ? 'SO' : 'PO'}`
                    : 'Edit Request'}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OrderDetails

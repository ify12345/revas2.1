/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import Modal from '../Modal'

import { approveOrder, generateOrder, getOrder } from '@/api/order'
import { useAppDispatch, useAppSelector } from '@/redux/store'

import CustomInput from '@/components/CustomInput'
import { Order } from '@/types/apiResponse'
import { showToast } from '@/components/Toast'
import Success from '@/components/svg/success'
import PdfViewer from '@/components/PdfViewer'
import Badge from '@/components/Badge'
import { StatusType } from '@/screens/orders/All'

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  person: Order
}
const productOptions = [
  {
    category: 'Plastics',
    options: [
      { label: 'PET Bales', value: 'PET Bales' },
      { label: 'Pet Flakes', value: 'Pet Flakes' },
      { label: 'Granules(pellets)', value: 'Granules(pellets)' },
      {
        label: 'High Density Polyethylene (HDPE)',
        value: 'High Density Polyethylene (HDPE)',
      },
      { label: 'Polyvinyl Chloride (PVC)', value: 'Polyvinyl Chloride (PVC)' },
      { label: 'Polypropylene (PP)', value: 'Polypropylene (PP)' },
    ],
  },
  {
    category: 'Metal',
    options: [
      { label: 'Aluminium', value: 'Aluminium' },
      { label: 'UBC(Cans)', value: 'UBC(Cans)' },
      { label: 'Ingots', value: 'Ingots' },
      { label: 'Scraps', value: 'Scraps' },
      { label: 'Sheets', value: 'Sheets' },
      { label: 'Castings', value: 'Castings' },
    ],
  },
  {
    category: 'Paper',
    options: [
      { label: 'White Office Paper', value: 'White Office Paper' },
      { label: 'Newspaper', value: 'Newspaper' },
      { label: 'Colored Office Paper', value: 'Colored Office Paper' },
      { label: 'Cardboard', value: 'Cardboard' },
      { label: 'White Computer Paper', value: 'White Computer Paper' },
      { label: 'Magazines', value: 'Magazines' },
      { label: 'Catalogs', value: 'Catalogs' },
      { label: 'Phone Books', value: 'Phone Books' },
      { label: 'Cartons', value: 'Cartons' },
    ],
  },
]
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

  const handleGenerateDocument = () => {
    setDocumentLoading(true)

    const payload = {
      id: person.id,
    }

    dispatch(generateOrder(payload))
      .unwrap()
      .then(response => {
        setDocumentLoading(false)
        dispatch(getOrder({}))
        showToast({ type: 'success', msg: response.message })

        // ✅ Robustly extract the document URL from the response
        const docUrl = response?.data?.docUrl || response?.document?.url || null

        if (docUrl) {
          setDocumentUrl(docUrl)
        }
      })
      .catch(err => {
        setDocumentLoading(false)

        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'
        showToast({ type: 'error', msg: errorMessage })

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

    dispatch(approveOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        dispatch(getOrder({}))
        onClose()
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
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
  // console.log('selected',person)
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

          <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
            <p className="text-[#98A2B3]">Supplier name</p>
            <p className="text-primary">
              {person.supplier?.firstName} {person.supplier?.lastName}
            </p>
          </div>
          <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
            <p className="text-[#98A2B3]">Account Manager (Supplier)</p>
            <p className="text-primary">
              {' '}
              {person.supplierAccountManager?.firstName}{' '}
              {person.supplierAccountManager?.lastName}
            </p>
          </div>
          <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
            <p className="text-[#98A2B3]">Product</p>
            <p className="text-primary">{person.product}</p>
          </div>
          <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
            <p className="text-[#98A2B3]">Price/tonne (USD)</p>
            <p className="text-primary">{person.pricePerTonne}</p>
          </div>
          <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
            <p className="text-[#98A2B3]">Capacity (MT/month)</p>
            <p className="text-primary">{person.capacity}</p>
          </div>

          <div className="text-sm flex flex-col w-full justify-between gap-3">
            <p className="text-[#98A2B3]">Buyer</p>
            <p className="text-[#98A2B3] bg-stroke border border-stroke p-2.5 rounded-lg">
              {person.buyer?.firstName} {person.buyer?.lastName}
            </p>
          </div>

          {person.status !== 'matched' && (
            <div className="text-sm flex flex-col lg:flex-row w-full justify-between">
               <p className="text-[#98A2B3]">Status</p>
              <Badge status={person.status as StatusType} disableEditing />
            </div>
          )}

        </div>
          <div className="flex justify-end  gap-3 border-t border-stroke py-3 items-end px-3">
            <button
              onClick={onClose}
              className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg text-sm transition-all duration-300 hover:scale-95"
            >
              Cancel
            </button>

            {(documentUrl || person.docUrl) && (
              <button
                onClick={handlePreviewDocument}
                className="bg-[#3b82f6] text-[#FFF] px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-95"
              >
                Preview Document
              </button>
            )}

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
                    : 'Approve'}
              </button>
            )}
          </div>
      </Modal>
    </>
  )
}

export default OrderDetails

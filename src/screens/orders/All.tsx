/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { deleteOrder, getDocuments, uploadDocument } from '@/api/order'
import Badge from '@/components/Badge'
import ActionDropdown from '@/components/modal/ActionDropdown'
import OrderDetails from '@/components/modal/orders-screen/OrderDetails'
import Status from '@/components/Status'
import { showToast } from '@/components/Toast'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Order } from '@/types/apiResponse'
import * as React from 'react'
import {
  FaCheckCircle,
  FaEye,
  FaDownload,
  FaUpload,
  FaTimes,
} from 'react-icons/fa'

interface Props {
  people: Order[]
}
export type StatusType = 'matched' | 'not_matched' | 'pending_approval'

export default function All({ people }: Props) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false)
  const [selectedPerson, setSelectedPerson] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [isPdfViewerOpen, setIsPdfViewerOpen] = React.useState(false)
  const [currentPdfUrl, setCurrentPdfUrl] = React.useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const clientType = user?.clientType
  const { getDocs } = useAppSelector(state => state.order)
 
  console.log('hii',people)

  const openDetailsModal = (person: Order): void => {
    setSelectedPerson(person)
    setIsDetailsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const openPdfViewer = (url: string) => {
    setCurrentPdfUrl(url)
    setIsPdfViewerOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false)
    document.body.style.overflow = 'auto'
  }

  const handleSubmit = (orderId: string) => {
    setLoading(true)

    dispatch(deleteOrder(orderId))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
      })
      .catch(err => {
        setLoading(false)
        const errorMessage = err?.msg.message || err?.response?.data?.detail
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleView = (person: Order) => {
    openDetailsModal(person)
  }

  // Helper function to check if a document exists for a specific order
  const hasMatchingDocument = (orderId: string) => {
    return getDocs.some(doc => doc.orderId === orderId)
  }

  // Get the document for a specific order (if it exists)
  const getDocumentForOrder = (orderId: string) => {
    return getDocs.find(doc => doc.orderId === orderId)
  }

  const viewPurchase = (person: Order) => {
    const document = getDocumentForOrder(person.id)
    if (document) {
      // Open the PDF viewer with the file URL
      openPdfViewer(document.fileUrl)
    } else {
      showToast({ type: 'error', msg: 'No document available for this order' })
    }
  }

  const handleDownload = (person: Order) => {
    const document = getDocumentForOrder(person.id)
    if (document) {
      console.log('Download:', document.downloadUrl)
      // Redirect to the download URL
      window.open(document.fileUrl, '_blank')
    } else {
      showToast({ type: 'error', msg: 'No document available for download' })
    }
  }

  const handleUpload = async (person: Order) => {
    const matchedDoc = getDocs.find(doc => doc.orderId === person.id)

    if (!matchedDoc) {
      showToast({
        type: 'error',
        msg: 'No matching document found for this order.',
      })
      return
    }

    const orderId = matchedDoc.orderId
    console.log(orderId)
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/pdf'

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]

        if (file.type !== 'application/pdf') {
          showToast({ type: 'error', msg: 'Only PDF files are allowed.' })
          return
        }
        dispatch(uploadDocument({ orderId, file }))
          .unwrap()
          .then(response => {
            setLoading(false)
            console.log('Success:', response)
            showToast({ type: 'success', msg: response.message })
            dispatch(getDocuments({}))
          })
          .catch(err => {
            setLoading(false)
            const errorMessage = err?.msg || err?.response?.data?.detail
            console.error('Error:', err)
            showToast({ type: 'error', msg: errorMessage })
          })
      }
    }

    input.click()
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {people.length === 0 ? (
            'No recorded orders'
          ) : (
            <div className="overflow-hidden shadow-sm sm:rounded-lg p-[24px] border border-stroke rounded-xl">
              <table className="min-w-full">
                <thead className="bg-[#F8FAFC] relative z-10 text-gray">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm text-gray-900 sm:pl-6"
                    >
                      Company Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Capacity<span className="text-[#757575]">(MT)</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Price/ton
                      <span className="text-[#757575]">(USD)</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC] bg-white relative z-10">
                  {people.map(person => (
                    <tr key={person.supplierName} className="hover:bg-gray-100">
                      <td
                        className={`py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 ${clientType !== 'Supplier' && clientType !== 'Buyer' ? 'cursor-pointer hover:scale-95 transition-all duration-300' : ''}`}
                        onClick={() => {
                         
                            openDetailsModal(person)
                      
                        }}
                      >
                        {person.supplierName}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.product}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.capacity}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {person.pricePerTonne}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      
                        {
                          user.role === 'buyer' || 'Buyer' ?  person.buyerLocation : person.supplierLocation
                        }
                       
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <Badge
                          status={person.status as StatusType}
                          orderId={person.id}
                        />
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 relative z-10">
                        {clientType === 'Supplier' || clientType === 'Buyer' ? (
                          <div className="flex space-x-3">
                            {/* Check if there's a matching document for this order */}
                            <button
                              onClick={() => viewPurchase(person)}
                              className={`text-gray-600 hover:text-gray-900 px-2 py-1 border rounded-md border-primary ${!hasMatchingDocument(person.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              title="View PDF"
                              disabled={!hasMatchingDocument(person.id)}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(person)}
                              className={`text-gray-600 hover:text-gray-900 px-2 py-1 border rounded-md bg-primary text-white ${!hasMatchingDocument(person.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              title="Download document to sign"
                              disabled={!hasMatchingDocument(person.id)}
                            >
                              Download 
                            </button>
                            <button
                              onClick={() => handleUpload(person)}
                              className="text-gray-600 hover:text-gray-900 px-2 py-1 border rounded-md bg-primary text-white"
                              title="Sign and Upload"
                            >
                              Upload 
                            </button>
                          </div>
                        ) : (
                          <ActionDropdown
                            onGoTo={() => {
                              // Add your go to logic here
                              console.log('Go to:', person.companyName)
                            }}
                            onDelete={() => {
                              handleSubmit(person.id)
                              console.log('Delete:', person.id)
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* OrderDetails Modal */}
      {selectedPerson && (
        <OrderDetails
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          person={selectedPerson}
        />
      )}

      {/* PDF Viewer Modal */}
      {isPdfViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-5/6 h-5/6 max-w-6xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-stroke">
              <h3 className="text-lg font-medium">Document Viewer</h3>
              <button
                onClick={closePdfViewer}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-auto">
              <iframe
                src={currentPdfUrl}
                className="w-full h-full"
                title="PDF Viewer"
                allow="fullscreen"
              />
            </div>
            <div className="flex justify-end p-4 border-t border-stroke">
              <button
                onClick={closePdfViewer}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

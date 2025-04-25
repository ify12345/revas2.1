/* eslint-disable @typescript-eslint/no-unused-vars */

import { deleteOrder } from '@/api/order'
import Badge from '@/components/Badge'
import ActionDropdown from '@/components/modal/ActionDropdown'
import OrderDetails from '@/components/modal/orders-screen/OrderDetails'
import Status from '@/components/Status'
import { showToast } from '@/components/Toast'
import { useAppDispatch } from '@/redux/store'
import { Order } from '@/types/apiResponse'
import { StatusType } from '@/types/product'
import * as React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

interface Props {
  people: Order[]
}

export default function Pending({ people }: Props) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false)
  const [selectedPerson, setSelectedPerson] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  console.log('payy:', people)
  const openDetailsModal = (person: Order): void => {
    setSelectedPerson(person)
    setIsDetailsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
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
        const errorMessage = err?.msg || err?.response?.data?.detail
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }
  return (
    <div className="mt-8 flow-root ">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {people.length === 0 ? (
            'No recorded orders'
          ) : (
            <div className="overflow-hidden shadow-sm sm:rounded-lg p-[24px] border border-stroke rounded-xl">
              <table className="min-w-full relative z-10">
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
                    <tr
                      key={person.supplierName}
                  
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td onClick={() => openDetailsModal(person)} className="cursor-pointer py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 hover:scale-95 transition-all duration-300">
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
                        {person.location}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                         <Badge status={person.status as StatusType} orderId={person.id} />
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 relative z-10">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedPerson && (
        <OrderDetails
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          person={selectedPerson}
        />
      )}
    </div>
  )
}

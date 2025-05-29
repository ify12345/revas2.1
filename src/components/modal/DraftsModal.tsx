/* eslint-disable no-constant-condition */
// Modal.tsx
import * as React from 'react'
import { IoMdClose } from 'react-icons/io'

import Badge from '../Badge'
import { useAppSelector } from '@/redux/store'

import { StatusType } from '@/types/product'
import ActionDropdown from './ActionDropdown'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const DraftsModal = ({ isOpen, onClose }: ModalProps) => {
  const savedOrder = useAppSelector(state => state.order.savedOrder)
  const user = useAppSelector(state => state.auth.user)
  // console.log(savedOrder)
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start pt-[19%] bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF]  overflow-y-auto  shadow-lg rounded-xl flex flex-col mx-auto w-full  max-w-[73%]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-stroke border-b px-5 py-[22px]">
          <h2 className="text-lg font-bold">Drafts</h2>
          <button onClick={onClose}>
            <IoMdClose className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col h-fit">
          <div className=" p-4  rounded-lg mt-4">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  {savedOrder && savedOrder.length === 0 ? (
                    'No saved orders'
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
                              Capacity
                              <span className="text-[#757575]">(MT)</span>
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
                          {savedOrder &&
                            savedOrder.map(person => (
                              <tr
                                key={person.supplierName}
                                className="cursor-pointer hover:bg-gray-100"
                              >
                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
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
                                {user.role === 'buyer' || 'Buyer'
                                ? person.buyerLocation
                                : person.supplierLocation}
                                </td>
                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                  <Badge
                                    status={person.status as StatusType}
                                    orderId={person.id}
                                  />
                                </td>
                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 relative z-10">
                                  <ActionDropdown
                                    onGoTo={() => {
                                      // Add your go to logic here
                                      console.log('Go to:', person.companyName)
                                    }}
                                    onDelete={function (): void {
                                      throw new Error(
                                        'Function not implemented.'
                                      )
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftsModal

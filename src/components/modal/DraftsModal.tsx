// Modal.tsx
import * as React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Person } from '../../types/tables'
import Badge from '../Badge'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const people: Person[] = [
  {
    id: 'IIS468S',
    date: '12-12-24',
    name: 'Bottling Solutions Inc',
    status: <Badge orderId='' status="matched" />,
    price: '$500,000',
    country: 'Thailand',
    quantity: '100',
    grade: 'A',
    supplier: 'EcoPlast Industries',
    product: 'Clear PET Flakes',
    capacity: '',
  },
  // More people...
]

const DraftsModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start pt-[19%]  bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF]  overflow-y-auto  shadow-lg rounded-xl flex flex-col mx-auto max-w-[73%]"
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
            <div className="mt-1 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm  sm:rounded-lg">
                    <table className="min-w-full ">
                      <thead className="bg-[#F8FAFC]">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Buyer
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Supplier
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Quantity (MT)
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Price/ton (USD)
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {people.map(person => (
                          <tr
                            key={person.id}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                              {person.date}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.id}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.supplier}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.product}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.quantity}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.price}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

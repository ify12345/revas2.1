/* eslint-disable @typescript-eslint/no-unused-vars */

import ActionDropdown from '@/components/modal/ActionDropdown'
import OrderDetails from '@/components/modal/orders-screen/OrderDetails'
import Status from '@/components/Status'
import { Order } from '@/types/apiResponse'
import { Person } from '@/types/page'
import * as React from 'react'
import { FaCheckCircle } from 'react-icons/fa';

const people: Person[] = [
  {
    supplierName: 'EcoPET Solutions',
    product: 'Clear PET Flakes',
    capacity: 850 - 900,
    price: '500',
    status: '',
    location: 'Thailand',
    id: '',
    email: '',
    pricePerTonne: 0,
    supplierPrice: 0,
    shippingCost: 0,
    negotiatePrice: false,
    priceRange: 0,
    savedStatus: '',
    docUrl: null,
    buyerId: null,
    supplierId: null,
    accountManagerId: null,
    userId: '',
    createdAt: '',
    updatedAt: ''

  },
  // More people...
]
export default function Buyers() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false)
  const [selectedPerson, setSelectedPerson] = React.useState<Order | null>(
    null
  )

  const openDetailsModal = (person: Person): void => {
    // Convert person to Order or ensure companyName is not undefined
    const order = {
      ...person,
      companyName: person.companyName || '' // Provide default value
    };
    
    // setSelectedPerson(order);
    setIsDetailsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
    document.body.style.overflow = 'auto'
  }
  return (
    <div className="flow-root ">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
              <tbody className="divide-y divide-gray-200 bg-white relative z-10">
                {people.map(person => (
                  <tr
                    key={person.supplierName}
                    onClick={() => openDetailsModal(person)}
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
                      {person.price}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {person.location}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {person.status}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 relative z-10">
                      <ActionDropdown
                        onGoTo={() => {
                          // Add your go to logic here
                          console.log('Go to:', person.supplierName)
                        }}
                        onDelete={() => {
                          // Add your delete logic here
                          console.log('Delete:', person.supplierName)
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

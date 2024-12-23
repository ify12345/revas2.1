import * as React from 'react';
import Status from './Status.js'

const people = [
  {
    companyName: 'EcoPET Solutions',
    product: 'Clear PET Flakes',
    capacity:'850-900',
    price: '800',
    status: <Status/>,
    location: 'Thailand',
    grade: 'A',
    
  },
  // More people...
]

export default function OrdersScreen() {
  return (
    <div className="flex flex-col">
      <div className=" py-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="font-medium text-2xl">Orders</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]">
              <p className="text-[#fff]">Create Order</p>
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm  sm:rounded-lg">
                <table className="min-w-full ">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm  text-gray-900 sm:pl-6"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Capacity<span className='text-[#757575]'>(MT)</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Price/ton<span className='text-[#757575]'>(USD)</span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm  text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map(person => (
                      <tr key={person.companyName}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {person.companyName}
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
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                         <button className='bg-[#FBECEB] p-[12px] rounded-[8px]'>
                            <span className="text-[#FF3B30]">
                                Delete
                            </span>
                         </button>
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
  )
}

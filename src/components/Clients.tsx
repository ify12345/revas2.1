import * as React from 'react';


import { IoPeopleOutline } from 'react-icons/io5'

import { CiCalendar } from 'react-icons/ci'
import SearchInput from './Search.js';
import Status from './Status.js';

const people = [
  {
    companyName: 'EcoPET Solutions',
    product: 'PET Flakes',
    capacity: '1000',
    price: '800',
    status: <Status />,
    location: 'Australia',
    grade: 'A',
  },
  // More people...
]

export default function ClientsScreen() {
  return (
    <div className="flex flex-col">
      <div className=" py-4">
        <div className="sm:flex sm:items-center">
          <p className="sm:flex-auto text-2xl font-semibold">Clients</p>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px] flex gap-2 items-center">
              <p className="text-[#fff]">New Supplier</p>
              <IoPeopleOutline color="white" />
            </button>
          </div>
        </div>
        <div className="sm:flex sm:items-center pt-[30px]">
          <div className="sm:flex-auto">
            <SearchInput />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 border border-[#E7E7E7] text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400">
              <CiCalendar className="text-[#8F8F8F] mr-2" />
              <span className="text-[#8F8F8F]">This Year</span>
            </div>
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
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Products
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Capacity<span className="text-[#757575]">(MT/M)</span>
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                          <span className="bg-[#EFEFEF] rounded-[8px] px-[10px] py-[4px] w-[79px]">
                            {person.product}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.capacity}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.location}
                        </td>

                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          <button className="bg-[#FBECEB] p-[12px] rounded-[8px]">
                            <span className="text-[#FF3B30]">Delete</span>
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

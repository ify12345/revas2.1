import * as React from 'react';

import { CiCalendar } from 'react-icons/ci'
import Badge from './Badge.js';
import SearchInput from './Search.js';




const details = [
  { name: 'Active Transactions', numer: '2' },
  { name: 'Pending Payments', numer: '10' },
  { name: 'Completed This Month', numer: '2' },
  { name: 'Total Volume (MT)', numer: '90,803' },
]

const people = [
  {
    id: 'IIS468S',
    name: 'Odili wisdom',
    status: <Badge/>,
    price: '$500,000',
    country: 'Thailand',
    capacity: '1000',
    grade: 'A',
  },
  // More people...
]

export default function HomeScreen() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[13.5px]">
        {details.map((item, index) => {
          return (
            <div className="bg-white rounded-[12px] p-[15px] border border-[#E2E8F0]  lg:h-[128px] flex flex-col gap-[42px]">
              <p className="text-[#8F8F8F] text-sm">{item.name}</p>
              <p className="text-black text-2xl font-[500]">{item.numer}</p>
            </div>
          )
        })}
      </div>

      <div className=" py-4">
        <div className="sm:flex sm:items-center">
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
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
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
                        Capacity (MT/month)
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map(person => (
                      <tr key={person.id}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {person.id}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.name}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.status}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.price}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.country}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.capacity}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.grade}
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

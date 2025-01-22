import React, { useState } from 'react'
import Status from './Status.js'
import { IoMdClose } from "react-icons/io";
import { Person } from './typings/page.js';

import { FaMoneyBill } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";


const details = [
  { name: 'Total orders', numer: '2',icon: <FaMoneyBill color="#0030FF" /> },
  { name: 'Pending orders', numer: '10',icon: <CiWallet color="#F26F03" /> },
  { name: 'Completed orders', numer: '2',icon: <FaCheckCircle color="#059669" /> },
]

const people: Person[] = [
  {
    companyName: 'EcoPET Solutions',
    product: 'Clear PET Flakes',
    capacity: '850-900',
    price: '800',
    status: <Status />,
    location: 'Thailand',
    grade: 'A',
  },
  // More people...
]

export default function OrdersScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] =  useState<Person | null>(null);
  
  const openDetailsModal = (person: Person): void => {
    setSelectedPerson(person)
    setIsDetailsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden' // Disable scrolling
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto' // Enable scrolling
  }

  return (
    <div className="flex flex-col">
      <div className="py-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="font-medium text-2xl">Orders</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={openModal}
              className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]"
            >
              <p className="text-[#fff]">Create Order</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[13.5px] mt-4">
        {details.map((item, index) => {
          return (
            <div className="bg-white rounded-[12px] p-[15px] border border-[#E2E8F0]   flex flex-col gap-[24px]">
               {item.icon}
              <div className="">
              <p className="text-[#8F8F8F] text-sm">{item.name}</p>
              <p className="text-black text-2xl font-[500]">{item.numer}</p>
              </div>
            </div>
          )
        })}
      </div>



        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-[#F8FAFC]">
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
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map(person => (
                      <tr  key={person.companyName}
                      onClick={() => openDetailsModal(person)}
                      className="cursor-pointer hover:bg-gray-100">
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

      {isDetailsModalOpen && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-4">
          <div
            className="absolute inset-0 bg-primary opacity-50 transition-all duration-500"
            onClick={closeDetailsModal}
          ></div>
          <div className="relative right-0 z-10 bg-[#ffff] rounded-[12px] shadow-lg w-[90%] max-w-[388px] overflow-y-auto h-full">
            <h2 className="text-lg font-normal mb-4 border-stroke border-b px-6 py-[22px]">
            {selectedPerson.companyName}
            </h2>
            <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
              <p className="text-sm flex w-full justify-between">
               Capacity
                <span>{selectedPerson.companyName}</span> 
              </p>
              <p className="text-sm flex w-full justify-between">
                <span>Product</span> {selectedPerson.product}
              </p>
              {/* <p className="text-sm flex w-full justify-between">
                <span>Capacity (MT):</span> {selectedPerson.capacity}
              </p> */}
              <p className="text-sm flex w-full justify-between">
                <span>Price/Tonne (USD):</span> {selectedPerson.price}
              </p>
              <p className="text-sm flex w-full justify-between">
                <span>Location:</span> {selectedPerson.location}
              </p>
              <p className="text-sm flex w-full justify-between">
                <span>Status:</span> {selectedPerson.status}
              </p>

              <div className="bg-[#F7F7F7] p-[12px]">
                <div className="flex w-full justify-between">
                  <div className="text-sm font-bold text-primary">Franko Recycling</div>
                  <IoMdClose color="gray" />
                </div>
                <p className="font-bold text-success">
                 ${selectedPerson.price}
                </p>
                <div className="flex w-full justify-between">
                  <div className="text-sm font-light text-[#8F8F8F]">capacity <span className="font-bold text-primary">{selectedPerson.price}</span></div>
                  <div className="text-sm font-light text-[#8F8F8F]">Account manager: <span className="font-bold text-primary">Lolade</span></div>
                 
                </div>
              </div>
              <select className="w-full p-2 border border-stroke rounded-md">
                  <option value="">Select Buyer</option>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                  <option value="location3">Location 3</option>
                </select>
                <button
                type="submit"
                className="bg-[#050505] text-[#ffff] py-[10px] px-[12px] rounded-[8px] w-full"
              >
              Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end p-8">
          <div
            className="absolute inset-0  bg-primary opacity-50 transition-all duration-500"
            onClick={closeModal}
          ></div>
          <div className="relative right-0 z-10 bg-[#ffff] rounded-[12px] shadow-lg w-full lg:w-[90%] max-w-[388px] h-full">
            <h2 className="text-lg font-bold mb-4 border-stroke border-b px-6 py-[22px]">
              Create Order
            </h2>
            <form className="my-6 mx-3 px-5  py-[22px] rounded-[12px] border-stroke border flex justify-between flex-col h-[85%]">
            <div className="h-full">

              {/* Company Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#757575]">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-stroke rounded-md"
                />
              </div>

              {/* Product Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#757575]">
                  Product
                </label>
                <select className="w-full p-2 border border-stroke rounded-md">
                  <option value="">Select Product</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                  <option value="product3">Product 3</option>
                </select>
              </div>

              {/* Capacity (MT) */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#757575]">
                  Capacity (MT)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-stroke rounded-md"
                  placeholder="Enter capacity in MT"
                />
              </div>

              {/* Price per tonne (USD) */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#757575]">
                  Price/Tonne (USD)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-stroke rounded-md"
                  placeholder="Enter price in USD"
                />
              </div>

              {/* Location Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-[#757575]">
                  Location
                </label>
                <select className="w-full p-2 border border-stroke rounded-md">
                  <option value="">Select Location</option>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                  <option value="location3">Location 3</option>
                </select>
              </div>
            </div>
<div className="flex justify-end items-center gap-2">

              <button
            
                type="submit"
                className="bg-[#fff] text-[#000] border border-stroke py-[10px] px-[12px] rounded-[8px]"
              >
                Save as draft
              </button>
              <button
            
                type="submit"
                className="bg-[#050505] text-[#ffff] py-[10px] px-[12px] rounded-[8px]"
              >
                Create
              </button>
</div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

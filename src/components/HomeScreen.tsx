import * as React from 'react';


import Badge from './Badge.js';

import { RiDraftLine } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";


const details = [
  { name: 'Active Transactions', numer: '2',icon: <FaMoneyBill color="#0030FF" /> },
  { name: 'Pending Payments', numer: '10',icon: <CiWallet color="#F26F03" /> },
  { name: 'Completed This Month', numer: '2',icon: <FaCheckCircle color="#059669" /> },
  { name: 'Total Volume (MT)', numer: '90,803',icon: <BsGraphUp /> },
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
interface Person {
  id: string;
  name: string;
  status: React.JSX.Element;
  price: string;
  country: string;
  capacity: string;
  grade: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Person | null;
}

function Modal({ isOpen, onClose, data }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6">
      <div className="bg-[#FFF] w-full max-w-md h-full shadow-lg rounded-lg flex justify-between flex-col">
<div className="">

        <div className="p-4 border-b border-stroke flex justify-between items-center">
          <h2 className="text-lg font-semibold">Row Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="m-4 border border-stroke p-2 rounded-lg">
          {data ? (
            <div className='text-[#000] space-y-4'>
             
              <p className='w-full flex justify-between'>
                <p className='text-[#98A2B3]'> Acccount Manager:</p> {data.name}
              </p>
              <p className='w-full flex justify-between'>
                <p className='text-[#98A2B3]'>Price/tonne (USD)</p> {data.price}
              </p>
              <p className='w-full flex justify-between'>
                <p className='text-[#98A2B3]'>Country:</p> {data.country}
              </p>
              <p className='w-full flex justify-between'>
                <p className='text-[#98A2B3]'>Capacity (MT/month)</p> {data.capacity}
              </p>
             <div className="flex flex-col text-[#98A2B3]">
              <label htmlFor="">Select Buyer</label>
              <select className='border border-stroke p-2 rounded-lg' name="" id="">
                <option value="">Select buyer</option>
              </select>
             </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
</div>

        <div className="flex justify-end px-5 gap-3 pb-6">
          <button className="bg-[#fff] text-[#000] px-2 py-2 border border-stroke rounded-md">Reject</button>
          <button className="bg-[#000] text-[#FFF] px-2 py-2 rounded-md">Approve</button>
        </div>

      </div>
    </div>
  );
}

export default function HomeScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState(null);

  const openModalWithRowData = (rowData: Person) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };



  return (
    <div className="flex flex-col">
       <div className="sm:flex sm:items-center p-2">
          <div className="sm:flex-auto">
            <p className="font-medium text-2xl">Home</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex items-center gap-2 ">
            <div className="border border-stroke flex p-2 justify-between items-center gap-2 rounded-md">
            <RiDraftLine />
            Drafts
            <div className="size-[20px] bg-[#2364DB] flex items-center justify-center text-[#fff] rounded-full">4</div>
            </div>
            <button
              // onClick={openModal}
              className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]"
            >
              <p className="text-[#fff]">Create Order</p>
            </button>
          </div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[13.5px]">
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

    
      <div className=" p-4 border border-stroke rounded-lg mt-4">
        <div className="sm:flex sm:items-center border-b border-stroke pb-[24px]">
          <div className="sm:flex-auto">
          Recent Transactions
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <div className="flex items-center">
            
              <a className="text-[#8F8F8F] underline">See more</a>
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
                      <tr    key={person.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => openModalWithRowData(person)}>
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
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedRowData} />
      <div className=" p-4 border border-stroke rounded-lg mt-4">
        <div className="sm:flex sm:items-center border-b border-stroke pb-3">
          <div className="sm:flex-auto">
          Request
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

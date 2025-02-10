import * as React from 'react'
import { RiDraftLine } from 'react-icons/ri'
import RowDetailsModal from './modal/RowDetailModal.js'
import CreateOrderModal from './modal/CreateOrderModal.js'
import { FaCheckCircle, FaMoneyBill } from 'react-icons/fa'
import { CiWallet } from 'react-icons/ci'
import DollarSvg from './svg/dollar.js'
import { BsGraphUp } from 'react-icons/bs'
import Badge from './Badge.js'

interface Person {
  id: string
  name: string
  status: React.JSX.Element
  price: string
  country: string
  capacity: string
  grade: string
}
const details = [
  {
    name: 'Active Transactions',
    numer: '2',
    icon: <FaMoneyBill color="#0030FF" />,
  },
  { name: 'Pending Payments', numer: '10', icon: <CiWallet color="#F26F03" /> },
  {
    name: 'Completed This Month',
    numer: '2',
    icon: <FaCheckCircle color="#059669" />,
  },
  {
    name: 'Total Volume (USD)',
    numer: '5',
    icon: <DollarSvg />,
  },
  { name: 'Total Volume (MT)', numer: '90,803', icon: <BsGraphUp /> },
]

const people = [
  {
    id: 'IIS468S',
    date: '12-12-24',
    name: 'Bottling Solutions Inc',
    status: <Badge status="matched" />,
    price: '$500,000',
    country: 'Thailand',
    quantity: '100',
    grade: 'A',
    supplier: 'EcoPlast Industries',
    product: 'Clear PET Flakes',
  },
  // More people...
]

interface HomeScreenProps {
  openOrderModal: () => void
}

export default function HomeScreen({ openOrderModal }: HomeScreenProps) {
  const [isRowDetailsModalOpen, setIsRowDetailsModalOpen] =
    React.useState(false)
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] =
    React.useState(false)
  const [selectedRowData, setSelectedRowData] = React.useState<Person | null>(
    null
  )

  const openRowDetailsModal = (rowData: Person) => {
    setSelectedRowData(rowData)
    setIsRowDetailsModalOpen(true)
  }

  const closeRowDetailsModal = () => {
    setIsRowDetailsModalOpen(false)
    setSelectedRowData(null)
  }

  const openCreateOrderModal = () => {
    setIsCreateOrderModalOpen(true)
  }

  const closeCreateOrderModal = () => {
    setIsCreateOrderModalOpen(false)
  }

  return (
    <div className="flex flex-col">
      <div className="sm:flex sm:items-center px-2 py-[21px]">
        <div className="sm:flex-auto">
          <p className="font-medium text-2xl">Home</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex items-center gap-2 ">
          <div className="border border-stroke flex p-2 justify-between items-center gap-2 rounded-md">
            <RiDraftLine />
            Drafts
            <div className="size-[20px] bg-[#2364DB] flex items-center justify-center text-[#fff] rounded-full">
              4
            </div>
          </div>
          <button
            onClick={openCreateOrderModal}
            className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]"
          >
            <p className="text-[#fff]">Create Order</p>
          </button>
        </div>
      </div>
      <RowDetailsModal
        isOpen={isRowDetailsModalOpen}
        onClose={closeRowDetailsModal}
        data={selectedRowData}
      />
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={closeCreateOrderModal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-[13.5px]">
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
          <div className="sm:flex-auto">Recent Transactions</div>
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
                        onClick={() => openRowDetailsModal(person)}
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

      <div className=" p-4 border border-stroke rounded-lg mt-4">
        <div className="sm:flex sm:items-center border-b border-stroke pb-3">
          <div className="sm:flex-auto">Request</div>
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

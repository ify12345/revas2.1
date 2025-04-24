/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { RiDraftLine } from 'react-icons/ri'
import RowDetailsModal from './modal/RowDetailModal.js'
import { FaCheckCircle, FaMoneyBill } from 'react-icons/fa'
import { CiWallet } from 'react-icons/ci'
import DollarSvg from './svg/dollar.js'
import { BsGraphUp } from 'react-icons/bs'
import Badge from './Badge.js'
import { Person } from '../types/tables.js'
import CurrencySvg from './svg/Currency.js'
import WalletSvg from './svg/Wallet.js'
import DraftsModal from './modal/DraftsModal.js'
import CalculatorSvg from './svg/CalculatorSvg.js'
import { useAppDispatch, useAppSelector } from '@/redux/store.js'
import { deleteOrder, getOrder } from '@/api/order.js'
import ActionDropdown from './modal/ActionDropdown.js'
import { Order } from '@/types/apiResponse.js'
import { showToast } from './Toast.js'
import CreateOrderForm from './modal/orders-screen/index.js'

type StatusType = 'matched' | 'not_matched' | 'pending';

const details = [
  {
    name: 'Active Transactions',
    numer: '2',
    icon: <CurrencySvg />,
  },
  { name: 'Pending Payments', numer: '10', icon: <WalletSvg /> },
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

const people: Person[] = [
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
    capacity: '',
  },
  // More people...
]

interface HomeScreenProps {
  openOrderModal: () => void
}

export default function HomeScreen() {
  const [isRowDetailsModalOpen, setIsRowDetailsModalOpen] =
    React.useState(false)
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] =
    React.useState(false)
  const [isDraftsModalOpen, setIsDraftsModalOpen] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = React.useState<Person | null>(
    null
  )
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false)
  const [selectedPerson, setSelectedPerson] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()
  // React.useEffect(() => {
  //   dispatch(getOrder({}))
  // }, [dispatch])

  const orders = useAppSelector(state => state.order)

  const list = Array.isArray(orders.order)
    ? orders.order
    : [orders.order].filter(Boolean)

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

  const openDraftsModal = () => {
    setIsDraftsModalOpen(true)
  }

  const closeCreateOrderModal = () => {
    setIsCreateOrderModalOpen(false)
  }

  const closeDraftsModal = () => {
    setIsDraftsModalOpen(false)
  }
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
    <div className="flex flex-col">
      <div className="sm:flex sm:items-center px-2 py-[21px]">
        <div className="sm:flex-auto flex items-center gap-2.5">
          <h4 className="text-2xl font-extralight">Home</h4>
          <div className="border border-[#F1F5F9] p-2.5 flex items-center gap-1 rounded-lg">
            <CalculatorSvg />
            <p className="text-sm text-primaryLight">Today's Price:</p>
            <p className="">
              $800<span className="text-primaryLight">/tonne</span>
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex items-center gap-2 ">
          <div onClick={openDraftsModal} className="border cursor-pointer border-stroke flex p-2 justify-between items-center gap-2 rounded-md">
            <RiDraftLine color="gray" />
            Drafts
            <div className="size-[20px] bg-[#2364DB] flex items-center justify-center text-[#fff] rounded-full">
              4
            </div>
          </div>
          {/* <button
            onClick={openCreateOrderModal}
            className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]"
          >
            <p className="text-[#fff]">Create Order</p>
          </button> */}
        </div>
      </div>
      <RowDetailsModal
        isOpen={isRowDetailsModalOpen}
        onClose={closeRowDetailsModal}
        data={selectedRowData}
      />
      <CreateOrderForm
        isOpen={isCreateOrderModalOpen}
        onClose={closeCreateOrderModal}
      />
      <DraftsModal isOpen={isDraftsModalOpen} onClose={closeDraftsModal} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-[13.5px]">
        {details.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-[12px] p-[15px] border border-[#E2E8F0]   flex flex-col gap-[24px]"
            >
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
          <div className="sm:flex-auto">Orders</div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <div className="flex items-center">
              <a className="text-[#8F8F8F] underline">See more</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {list.length === 0 ? (
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
                      {list
                        .filter((person): person is Order => person !== null)
                        .map(person => (
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
                              {person.pricePerTonne}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {person.location}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            <Badge status={person.status as StatusType} />

                    
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
                          {person.quantity}
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

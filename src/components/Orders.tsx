/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
// OrdersScreen.tsx
import React, { useState, useEffect } from 'react'
import Status from './Status.js'
import { Person } from '../types/page.js'
import { FaCheckCircle } from 'react-icons/fa'
import CurrencySvg from './svg/Currency.js'
import WalletSvg from './svg/Wallet.js'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaSearch } from 'react-icons/fa'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import All from '@/screens/orders/All.js'
import Pending from '@/screens/orders/Pending.js'
import Completed from '@/screens/orders/Completed.js'
import { useAppDispatch, useAppSelector } from '@/redux/store.js'
import { getOrder } from '@/api/order.js'
import { Order } from '@/types/apiResponse.js'
import { RiDraftLine } from 'react-icons/ri'
import DraftsModal from './modal/DraftsModal.js'
import CreateOrderForm from './modal/orders-screen/index.js'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function OrdersScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeScreen, setActiveScreen] = React.useState('all')
  const [isDraftsModalOpen, setIsDraftsModalOpen] = React.useState(false)

  const user = useAppSelector(state => state.auth.user)
  const savedOrder = useAppSelector(state => state.order.savedOrder)
  // Filter states
  const [companyFilter, setCompanyFilter] = useState<string>('')
  const [productFilter, setProductFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [dateFilter, setDateFilter] = useState<string>('')

  // Add Redux hooks
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.order)
  const { getDocs } = useAppSelector(state => state.order)

  const list = Array.isArray(orders.order)
    ? orders.order
    : [orders.order].filter(Boolean)
   

  // Fetch orders when component mounts
  useEffect(() => {
    dispatch(getOrder({}))
  }, [dispatch])

  const clientType = user?.clientType

  // Conditionally set navigation based on client type
  const navigation =
    clientType === 'Supplier' || clientType === 'Buyer'
      ? [
          { name: 'Pending', key: 'pending' },
          { name: 'Completed', key: 'completed' },
        ]
      : [
          { name: 'All orders', key: 'all' },
          { name: 'Pending', key: 'pending' },
          { name: 'Completed', key: 'completed' },
        ]

  // Set default active screen based on client type
  useEffect(() => {
    if (clientType === 'Supplier' || clientType === 'Buyer') {
      setActiveScreen('pending')
    }
  }, [clientType])

  const openDraftsModal = () => {
    setIsDraftsModalOpen(true)
  }
  const closeDraftsModal = () => {
    setIsDraftsModalOpen(false)
  }

  // Apply filters to the list
  const getFilteredList = () => {
    let filteredList = list.filter((item): item is Order => item !== null)

    // Filter by company name
    if (companyFilter) {
      filteredList = filteredList.filter(item =>
        item.supplierName?.toLowerCase().includes(companyFilter.toLowerCase())
      )
    }

    // Filter by product
    if (productFilter) {
      filteredList = filteredList.filter(item =>
        item.product?.toLowerCase().includes(productFilter.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter) {
      filteredList = filteredList.filter(item => item.status === statusFilter)
    }

    // Filter by search query (search across multiple fields)
    if (searchQuery) {
      filteredList = filteredList.filter(
        item =>
          item.supplierName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by date (assuming there's a createdAt field as ISO string)
    if (dateFilter) {
      const selectedDate = new Date(dateFilter).setHours(0, 0, 0, 0)

      filteredList = filteredList.filter(item => {
        if (!item.createdAt) return false
        const orderDate = new Date(item.createdAt).setHours(0, 0, 0, 0)
        return orderDate === selectedDate
      })
    }

    return filteredList
  }

  const getActiveScreen = () => {
    const filteredList = getFilteredList()
    // console.log(filteredList)
    switch (activeScreen) {
      case 'all':
        return <All people={filteredList} />

      case 'pending':
        const pendingOrders = filteredList.filter(
          (item): item is Order => item.savedStatus === 'confirmed'
        )
        return <All people={pendingOrders} />

      case 'completed':
        return (
          <All
            people={filteredList.filter(
              (item): item is Order => item.savedStatus === 'delivered'
            )}
          />
        )
      default:
        return <All people={filteredList} />
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  // Get unique company names for dropdown
  const companyOptions = Array.from(
    new Set(
      list
        .filter((item): item is Order => item !== null)
        .map(item => item.supplierName)
    )
  ).filter(Boolean)

  // Get unique product names for dropdown
  const productOptions = Array.from(
    new Set(
      list
        .filter((item): item is Order => item !== null)
        .map(item => item.product)
    )
  ).filter(Boolean)

  // Status options
  const statusOptions = [
    { value: 'matched', label: 'Matched' },
    { value: 'not_matched', label: 'Not Matched' },
    { value: 'pending', label: 'Pending' },
    { value: 'document_phase', label: 'Documentation' },
    { value: 'completed', label: 'Completed' },
  ]

  // Conditional order details based on client type
  const orderDetails =
    clientType === 'Supplier' || clientType === 'Buyer'
      ? [
          {
            name: 'Pending orders',
            numer:
              list?.filter(o => o && o.savedStatus === 'confirmed')?.length ||
              '0',
            icon: <CurrencySvg />, // Use the icon that was previously for "All"
          },
          {
            name: 'Completed orders',
            numer:
              list?.filter(o => o && o.savedStatus === 'delivered')?.length ||
              '0',
            icon: <WalletSvg />, // Use the icon that was previously for "Pending"
          },
        ]
      : [
          {
            name: 'Total orders',
            numer: list?.length || '0',
            icon: <CurrencySvg />,
          },
          {
            name: 'Pending orders',
            numer:
              list?.filter(o => o && o.savedStatus === 'confirmed')?.length ||
              '0',
            icon: <WalletSvg />,
          },
          {
            name: 'Completed orders',
            numer:
              list?.filter(o => o && o.savedStatus === 'delivered')?.length ||
              '0',
            icon: <FaCheckCircle color="#059669" />,
          },
        ]

  return (
    <div className="flex flex-col relative z-10">
      <div className="py-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="font-medium text-2xl">
              {clientType === 'Supplier' || clientType === 'Buyer'
                ? 'Purchase Order'
                : 'Orders'}
            </p>
          </div>
          {clientType === 'Supplier' || clientType === 'Buyer' ? (
            ''
          ) : (
            <div className="mt-4 sm:mt-0 sm:ml-16 flex gap-3 sm:flex-row">
              <div
                onClick={openDraftsModal}
                className="border cursor-pointer border-stroke flex p-2 justify-between items-center gap-2 rounded-md"
              >
                <RiDraftLine color="gray" />
                Drafts
                {savedOrder && savedOrder.length > 0 && (
                  <div className="size-[20px] bg-[#2364DB] flex items-center justify-center text-[#fff] rounded-full">
                    {savedOrder.length}
                  </div>
                )}
              </div>
              <button
                onClick={openModal}
                className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px]"
              >
                <p className="text-[#fff]">Create Order</p>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[13.5px] mt-4">
          {orderDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[12px] p-[26px] border border-[#E2E8F0] flex flex-col gap-[24px]"
            >
              {item.icon}
              <div className="">
                <p className="text-[#8F8F8F] text-sm">{item.name}</p>
                <p className="text-black text-2xl font-[500]">{item.numer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-[#E2E8F0] bg-white">
          <div className="mx-auto px-4 ">
            <div className="flex justify-between">
              <div className="flex">
                <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                  {navigation.map(item => (
                    <button
                      key={item.key}
                      onClick={() => setActiveScreen(item.key)}
                      className={classNames(
                        activeScreen === item.key
                          ? 'border-black text-gray-900 border-b-2 '
                          : 'border-[#8F8F8F] text-[#8F8F8F] hover:border-black hover:text-black font-light',
                        'inline-flex items-center px-1 py-[20px] text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map(item => (
                <DisclosureButton
                  key={item.key}
                  onClick={() => setActiveScreen(item.key)}
                  className={classNames(
                    activeScreen === item.key
                      ? 'border-black bg-gray-50 text-black'
                      : 'border-[#8F8F8F] text-[#8F8F8F] hover:border-black hover:text-black font-light',
                    'block border-l-4 py-2 pr-4 pl-3 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
        {clientType === 'Supplier' || clientType === 'Buyer' ? (
          ''
        ) : (
          <div className="py-4 flex flex-col gap-2 lg:flex-row items-center justify-between w-full">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-1/2">
              <select
                className="p-2 border border-stroke rounded-md"
                value={companyFilter}
                onChange={e => setCompanyFilter(e.target.value)}
              >
                <option value="">Company Name</option>
                {companyOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border border-stroke rounded-md"
                value={productFilter}
                onChange={e => setProductFilter(e.target.value)}
              >
                <option value="">Product</option>
                {productOptions.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border border-stroke rounded-md"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">Status</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-1/2 justify-end lg:gap-9">
              <div className="relative flex items-center w-full">
                <FaSearch className="absolute left-3 text-gray" />
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <input
                className="border border-stroke p-2 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none"
                type="date"
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        )}

        <main>
          <div className="mx-auto ">{getActiveScreen()}</div>
        </main>
      </div>
      

      <CreateOrderForm isOpen={isModalOpen} onClose={closeModal} />
      <DraftsModal isOpen={isDraftsModalOpen} onClose={closeDraftsModal} />
    </div>
  )
}

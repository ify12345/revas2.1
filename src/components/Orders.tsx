/* eslint-disable @typescript-eslint/no-unused-vars */
// OrdersScreen.tsx
import React, { useState } from 'react'
import Status from './Status.js'
import { Person } from './typings/page.js'
import { FaCheckCircle } from 'react-icons/fa'
import CurrencySvg from './svg/Currency.js'
import WalletSvg from './svg/Wallet.js'
import CreateOrderForm from './modal/orders-screen/CreateOrderForm.js'
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

const details = [
  { name: 'Total orders', numer: '2', icon: <CurrencySvg /> },
  { name: 'Pending orders', numer: '10', icon: <WalletSvg /> },
  {
    name: 'Completed orders',
    numer: '2',
    icon: <FaCheckCircle color="#059669" />,
  },
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

const navigation = [
  { name: 'All orders', key: 'all' },
  { name: 'Pending', key: 'pending' },
  { name: 'Completed', key: 'completed' },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function OrdersScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [activeScreen, setActiveScreen] = React.useState('all')

  const getActiveScreen = () => {
    switch (activeScreen) {
      case 'all':
        return <All />
      case 'pending':
        return <Pending />
      case 'completed':
        return <Completed />
      default:
        return <All />
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

  return (
    <div className="flex flex-col relative z-10">
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
          {details.map((item, index) => (
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

        <div className="py-4 flex flex-col lg:flex-row items-center justify-between w-full">
          <div className="flex items-center gap-3 w-full lg:w-1/2">
            <select className=" p-2 border border-stroke rounded-md">
              <option value="">Company Name</option>
              <option value="location1">Location 1</option>
            </select>
            <select className=" p-2 border border-stroke rounded-md">
              <option value="">Product</option>
              <option value="location1">Location 1</option>
            </select>
            <select className="p-2 border border-stroke rounded-md">
              <option value="">Status</option>
              <option value="location1">Location 1</option>
            </select>
          </div>
          <div className="flex w-full lg:w-1/2 justify-end gap-9">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray" />
              <input
                type="search"
                placeholder="Search..."
                className="w-[300px] pl-10 pr-4 py-2 border border-stroke rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <input
              className="border border-stroke p-2 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none"
              type="date"
            />
          </div>
        </div>
        <main>
          <div className="mx-auto ">{getActiveScreen()}</div>
        </main>
      </div>

      <CreateOrderForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

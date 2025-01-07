import * as React from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import All from './All'
import Received from './Received'
import Sent from './Sent'
import { IoPeopleOutline } from 'react-icons/io5'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const TransactionsScreen = () => {
  const [activeScreen, setActiveScreen] = React.useState('All')

  const navigation = [
    { name: 'All', key: '24' },
    { name: 'Recieved', key: '10' },
    { name: 'Sent', key: 'Clients' },
  ]

  const getActiveScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <All />
      case 'Recieved':
        return <Received />
      case 'Sent':
        return <Sent />
      default:
        return <All />
    }
  }
  return (
    <div>
         <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="font-medium text-2xl">Transactions</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
            //   onClick={openModal}
              className="bg-[#050505] text-white py-[10px] px-[12px] rounded-[8px] flex gap-2 items-center"
            >
              <p className="text-[#fff]">Generate report</p>
              <IoPeopleOutline color="white" />
            </button>
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
                      {item.name}({item.key})
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
            <div className="space-y-1 pt-2 pb-3 px-4">
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

        <div className="px-5 lg:px-[88px] pt-[36px]">
          <header></header>
          <main>
            <div className="mx-auto ">{getActiveScreen()}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default TransactionsScreen

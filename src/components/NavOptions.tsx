import * as React from 'react';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { 
  Bars3Icon, 
  HomeIcon, 
  NewspaperIcon, 
  UsersIcon, 
  XMarkIcon ,
  TruckIcon
} from '@heroicons/react/24/outline'
import HomeScreen from './HomeScreen.js'
import OrdersScreen from './Orders.js'
import ClientsScreen from './Clients.js'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}


// Individual Components for Screens



const TransactionsScreen = () => <div>Transactions Content</div>

export default function NavOptions() {
  const [activeScreen, setActiveScreen] = React.useState('Home')

  const navigation = [
    { name: 'Home', key: 'Home', icon: HomeIcon },
    { name: 'Orders', key: 'Orders', icon: TruckIcon },
    { name: 'Clients', key: 'Clients', icon: UsersIcon },
    { name: 'Transactions', key: 'Transactions', icon: NewspaperIcon },
  ]

  const getActiveScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen />
      case 'Orders':
        return <OrdersScreen />
      case 'Clients':
        return <ClientsScreen />
      case 'Transactions':
        return <TransactionsScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto px-4 sm:px-[88px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                {navigation.map((item) => (
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
                    <item.icon
                      className={classNames(
                        'h-5 w-5 mr-2',
                        activeScreen === item.key ? 'text-black' : 'text-gray-400'
                      )}
                      aria-hidden="true"
                    />
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
          <div className="space-y-1 pt-2 pb-3 px-4">
            {navigation.map((item) => (
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
        <header>
        </header>
        <main>
          <div className="mx-auto ">
            {getActiveScreen()}
          </div>
        </main>
      </div>
    </div>
  )
}

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import CompanyProfile from './CompanyProfile'
import Users from './Users'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}
export default function ManageCompany() {
  const [activeScreen, setActiveScreen] = React.useState('profile')
  const navigation = [
    { name: 'Company Profile', key: 'profile' },
    { name: 'Users', key: 'users' },
  ]
  const getActiveScreen = () => {
    switch (activeScreen) {
      case 'profile':
        return <CompanyProfile />

      case 'users':
        return <Users />
      default:
        return <CompanyProfile />
    }
  }

  return (
    <div className="">
      <p className="text-2xl font-medium mb-[24px]">Manage Company</p>
      <div className="w-full items-center">
        <div className="min-h-full">
          <Disclosure as="nav" className="border-b border-[#E2E8F0] bg-white">
            <div className="mx-auto">
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
        </div>
      </div>

      <main>
        <div className="mx-auto ">{getActiveScreen()}</div>
      </main>
    </div>
  )
}

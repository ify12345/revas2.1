import React, { useState } from 'react'
import logo from '@/assets/images/dash-icon.png'
import { CiHome, CiDeliveryTruck } from 'react-icons/ci'
import { MdPeopleOutline } from 'react-icons/md'
import { IoReceiptOutline } from 'react-icons/io5'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiMenu } from 'react-icons/fi' // Hamburger icon
import { IoClose } from 'react-icons/io5' // Close icon
import { FaCaretDown } from 'react-icons/fa'
import HomeScreen from '../HomeScreen'
import OrdersScreen from '../Orders'
import ClientsScreen from '../Clients'
import TransactionsScreen from '../TransactionsScreen'
interface LayoutProps {
  children: React.ReactNode; // This specifies that the component expects children
}

// Components for views
const Home = () => <HomeScreen/>
const Delivery = () => <OrdersScreen/>
const People = () => <ClientsScreen/>
const Receipts = () => <TransactionsScreen/>
const Support = () => <div>Support Page</div>

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<string>('Home') // Tracks the active view

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Links for dynamic rendering
  const links = [
    { id: 'Home', label: 'Home', icon: <CiHome />, component: <Home /> },
    {
      id: 'Orders',
      label: 'Delivery',
      icon: <CiDeliveryTruck />,
      component: <Delivery />,
    },
    {
      id: 'Buyer',
      label: 'Buyer',
      icon: <MdPeopleOutline />,
      component: <People />,
    },
    {
      id: 'Transactions',
      label: 'Transactions',
      icon: <IoReceiptOutline />,
      component: <Receipts />,
    },
  ]

  return (
    <div className="h-screen lg:flex overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0 bg-[#fff]' : '-translate-x-full'
        } md:relative md:translate-x-0 w-20 bg-gray-800 text-white p-4 border-r border-[#E7E7E7] transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <li>
            <a
              href="#logo"
              className="flex items-center space-x-3 text-lg max-w-[52px]"
            >
              <img src={logo} className="w-full" alt="Logo" />
            </a>
          </li>

          {/* Dynamic Links */}
          {links.map(link => (
            <li key={link.id}>
              <button
                onClick={() => setActiveView(link.id)}
                className={`flex items-center space-x-3 text-lg p-3 rounded-2xl ${
                  activeView === link.id
                    ? 'bg-primary text-white'
                    : 'text-gray-400'
                }`}
              >
                {React.cloneElement(link.icon, {
                  color: activeView === link.id ? 'white' : 'gray',
                })}
              </button>
            </li>
          ))}

          {/* Contact Link */}
          <li className="pt-[60px] border-t border-[#E7E7E7]">
            <button
              onClick={() => setActiveView('support')}
              className={`flex items-center space-x-3 text-lg p-3 rounded-2xl ${
                activeView === 'support'
                  ? 'bg-primary text-white'
                  : 'text-gray-400'
              }`}
            >
              <TfiHeadphoneAlt
                color={activeView === 'support' ? 'white' : 'gray'}
              />
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header
          className={`bg-green-500 text-white p-6 border-b border-[#E7E7E7] shadow-md flex items-center ${
            !isSidebarOpen ? 'justify-between' : 'justify-start'
          }`}
        >
          {/* Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            className={`block md:hidden text-white text-2xl focus:outline-none ${
              isSidebarOpen ? 'relative left-14' : ''
            }`}
          >
            {isSidebarOpen ? <IoClose /> : <FiMenu />}
          </button>

          {/* Title */}
          {!isSidebarOpen && (
            <h1 className="text-base font-medium">{activeView}</h1>
          )}

          {/* User Info */}
          {!isSidebarOpen && (
            <div className="flex items-center">
              {/* Icons Section */}
              <div className="flex gap-4 lg:px-[24px] pr-1 border-r border-[#E7E7E7]">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.96875 18C0.96875 8.05888 9.02763 0 18.9688 0C28.9099 0 36.9688 8.05888 36.9688 18C36.9688 27.9411 28.9099 36 18.9688 36C9.02763 36 0.96875 27.9411 0.96875 18Z"
                    fill="#F1F5F9"
                  />
                  <path
                    d="M11.4688 14.5C11.4688 13.0999 11.4688 12.3998 11.7412 11.865C11.9809 11.3946 12.3634 11.0122 12.8338 10.7725C13.3686 10.5 14.0686 10.5 15.4688 10.5H22.4688C23.8689 10.5 24.5689 10.5 25.1037 10.7725C25.5741 11.0122 25.9566 11.3946 26.1963 11.865C26.4687 12.3998 26.4687 13.0999 26.4687 14.5V19C26.4687 20.4001 26.4687 21.1002 26.1963 21.635C25.9566 22.1054 25.5741 22.4878 25.1037 22.7275C24.5689 23 23.8689 23 22.4687 23H20.3719C19.8518 23 19.5918 23 19.3431 23.051C19.1224 23.0963 18.9089 23.1712 18.7083 23.2737C18.4822 23.3892 18.2792 23.5517 17.8731 23.8765L15.8852 25.4668C15.5385 25.7442 15.3651 25.8829 15.2192 25.8831C15.0923 25.8832 14.9723 25.8255 14.8931 25.7263C14.8021 25.6123 14.8021 25.3903 14.8021 24.9463V23C14.0271 23 13.6396 23 13.3217 22.9148C12.459 22.6836 11.7851 22.0098 11.5539 21.147C11.4688 20.8291 11.4688 20.4416 11.4688 19.6667V14.5Z"
                    stroke="#334155"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.96875 18C0.96875 8.05888 9.02763 0 18.9688 0C28.9099 0 36.9688 8.05888 36.9688 18C36.9688 27.9411 28.9099 36 18.9688 36C9.02763 36 0.96875 27.9411 0.96875 18Z" fill="#F1F5F9"/>
<path d="M23.9661 16.3327C23.9661 15.0066 23.4394 13.7348 22.5017 12.7971C21.564 11.8595 20.2922 11.3327 18.9661 11.3327C17.6401 11.3327 16.3683 11.8595 15.4306 12.7971C14.4929 13.7348 13.9661 15.0066 13.9661 16.3327V22.9993H23.9661V16.3327ZM25.6328 23.5552L25.9661 23.9994C26.0126 24.0613 26.0408 24.1349 26.0478 24.2119C26.0547 24.289 26.0401 24.3665 26.0055 24.4357C25.9709 24.5049 25.9177 24.5631 25.8519 24.6038C25.786 24.6445 25.7102 24.666 25.6328 24.666H12.2995C12.2221 24.666 12.1462 24.6445 12.0804 24.6038C12.0146 24.5631 11.9614 24.5049 11.9268 24.4357C11.8922 24.3665 11.8775 24.289 11.8845 24.2119C11.8914 24.1349 11.9197 24.0613 11.9661 23.9994L12.2995 23.5552V16.3327C12.2995 14.5646 13.0019 12.8689 14.2521 11.6186C15.5023 10.3684 17.198 9.66602 18.9661 9.66602C20.7343 9.66602 22.4299 10.3684 23.6802 11.6186C24.9304 12.8689 25.6328 14.5646 25.6328 16.3327V23.5552ZM16.8828 25.4993H21.0495C21.0495 26.0519 20.83 26.5818 20.4393 26.9725C20.0486 27.3632 19.5187 27.5827 18.9661 27.5827C18.4136 27.5827 17.8837 27.3632 17.493 26.9725C17.1023 26.5818 16.8828 26.0519 16.8828 25.4993Z" fill="#334155"/>
                </svg>

              </div>
              {/* Profile Section */}
              <div className="flex lg:gap-4 ml-1 lg:mx-[24px] border border-[#E7E7E7] p-[4px] items-center rounded-lg">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.96875 14.25C0.96875 6.37995 7.3487 0 15.2188 0C23.0888 0 29.4688 6.37995 29.4688 14.25V15.75C29.4688 23.6201 23.0888 30 15.2188 30C7.3487 30 0.96875 23.6201 0.96875 15.75V14.25Z"
                    fill="#F1F5F9"
                  />
                  <path
                    d="M11.9495 14.3685C12.2578 13.2179 13.4406 12.0352 14.5912 11.7268L21.7645 9.80445C22.9151 9.4961 23.5979 10.1789 23.2896 11.3295L21.3672 18.5029C21.0588 19.6535 19.8761 20.8362 18.7255 21.1445L11.5521 23.0669C10.4015 23.3753 9.71876 22.6925 10.0271 21.5419L11.9495 14.3685Z"
                    fill="#9E77ED"
                  />
                </svg>
                <div className="flex flex-col">
                  <p className="text-sm">John Doe</p>
                  <p className="text-[#98A2B3] text-[10px]">Sonder Company</p>
                </div>
                <FaCaretDown color="#98A2B3" />
              </div>
            </div>
          )}
        </header>

        {/* Body Content */}
        <div className="p-[23px]">
          {activeView === 'support' ? (
            <Support />
          ) : (
            links.find(link => link.id === activeView)?.component
          )}
        </div>
        <div className="hidden">

        {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

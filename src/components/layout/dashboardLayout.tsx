/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/dash-icon.png'
import { CiHome, CiDeliveryTruck } from 'react-icons/ci'
import { MdPeopleOutline } from 'react-icons/md'
import { IoReceiptOutline } from 'react-icons/io5'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { FaCaretDown, FaSignOutAlt } from 'react-icons/fa'
import HomeScreen from '../HomeScreen'
import OrdersScreen from '../Orders'
import ClientsScreen from '../Clients'
import TransactionsScreen from '../TransactionsScreen'
import { persistor, useAppDispatch, useAppSelector } from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/redux/reducers/auth'
import Message from '../Message'
import Notifications from '../Notifications'

interface LayoutProps {
  children: React.ReactNode
}

// Components for views
const Home = () => <HomeScreen />
const Delivery = () => <OrdersScreen />
const People = () => <ClientsScreen />
const Receipts = () => <TransactionsScreen />
const Support = () => <div>Support Page</div>

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<string>('Home')
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('revas')
    persistor.purge()
    navigate('/sign-in')
  }

  const user = useAppSelector(state => state.auth.user)
  const userName = user?.firstName
  console.log(userName)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCreateOrder = () => {
    setActiveView('Orders')
    setIsOrderModalOpen(true)
    console.log('clicked')
  }

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
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0 bg-[#fff]' : '-translate-x-full'
        } md:relative md:translate-x-0 w-20 bg-gray-800 text-white p-4 border-r border-[#E7E7E7] transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col items-center space-y-6">
          <li>
            <a
              href="#logo"
              className="flex items-center space-x-3 text-lg max-w-[52px]"
            >
              <img src={logo} className="w-full" alt="Logo" />
            </a>
          </li>

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

      <div className="flex-1 flex flex-col">
        <header
          className={`bg-green-500 text-white p-3 px-6 border-b border-[#E7E7E7] shadow-md flex items-center ${
            !isSidebarOpen ? 'justify-between' : 'justify-start'
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`block md:hidden text-white text-2xl focus:outline-none ${
              isSidebarOpen ? 'relative left-14' : ''
            }`}
          >
            {isSidebarOpen ? <IoClose /> : <FiMenu />}
          </button>

          {!isSidebarOpen && (
            <h1 className="text-base font-medium">{activeView}</h1>
          )}

          {!isSidebarOpen && (
            <div className="flex items-center">
              <div className="flex gap-4 lg:px-[24px] pr-1 border-r border-[#E7E7E7]">
                <Message />
                <Notifications />
              </div>
              {/* Profile Section */}
              <div
                ref={dropdownRef}
                className="relative flex lg:gap-4 ml-1 lg:mx-[24px] border border-[#E7E7E7] p-[4px] items-center rounded-lg cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
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
                  <p className="text-sm text-primary">{userName}</p>
                  <p className="text-[#98A2B3] text-[10px]">Sonder Company</p>
                </div>
                <FaCaretDown color="#98A2B3" />

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-danger flex items-center gap-2"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </li>
                      {/* You can add more dropdown items here */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        <div className="p-[23px]">
          {activeView === 'support' ? (
            <Support />
          ) : (
            React.cloneElement(
              links.find(link => link.id === activeView)?.component || <div />,
              {
                onCreateOrder: handleCreateOrder,
              }
            )
          )}
        </div>

        <div className="hidden">{children}</div>
      </div>
    </div>
  )
}

export default Layout

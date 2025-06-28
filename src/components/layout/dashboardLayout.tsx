/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/dash-icon.png'
import { CiHome, CiDeliveryTruck } from 'react-icons/ci'
import { MdPeopleOutline, MdOutlineInventory } from 'react-icons/md'
import { IoReceiptOutline, IoStatsChartOutline } from 'react-icons/io5'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiMenu, FiSettings } from 'react-icons/fi'
import { IoClose, IoPersonOutline } from 'react-icons/io5'
import {
  FaCaretDown,
  FaSignOutAlt,
  FaBoxOpen,
  FaWarehouse,
  FaClock,
  FaUserClock,
} from 'react-icons/fa'
import { RiSettingsLine } from 'react-icons/ri'
import { MdPendingActions } from 'react-icons/md'
import HomeScreen from '../HomeScreen'
import OrdersScreen from '../Orders'
import ClientsScreen from '../Clients'
import TransactionsScreen from '../TransactionsScreen'
import { persistor, useAppDispatch, useAppSelector } from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/redux/reducers/auth'
import Message from '../Message'
import Notifications from '../Notifications'
import {
  getDocuments,
  getDrafts,
  getNotifications,
  getOrder,
} from '@/api/order'
import ManageCompany from '../ManageCompany'
import Notification from '../Notification'
import {
  approveUsers,
  fetchNigerianStates,
  getPendingUsers,
  rejectUsers,
} from '@/api/auth'
import { PendingUser } from '@/types/apiResponse'
import UserAuthenticationModal from '../UserAuthentication'
import { showToast } from '../Toast'
import Loader from '../Loader'

interface LayoutProps {
  children: React.ReactNode
}

// Components for views
const Home = () => <HomeScreen />
const Delivery = () => <OrdersScreen />
const People = () => <ClientsScreen />
const Support = () => <div>Support Page</div>
const Manage = () => <ManageCompany />
const Settings = () => <div>Settings Page</div>
const PurchaseOrder = () => <OrdersScreen />

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPendingDropdownOpen, setIsPendingDropdownOpen] = useState(false)
  const [selectedPendingUser, setSelectedPendingUser] =
    useState<PendingUser | null>(null)
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const pendingDropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const notifications = useAppSelector(state => state.auth.notifications)
  const user = useAppSelector(state => state.auth.user)
  const pendingUsers = useAppSelector(state => state.auth.pendingUsers)
  const clientType = user?.clientType

  // Set default active view based on client type
  const [activeView, setActiveView] = useState<string>(
    clientType === 'Supplier' || clientType === 'Buyer'
      ? 'Purchase Order'
      : 'Home'
  )

  React.useEffect(() => {
    const token = localStorage.getItem('revas')

    if (token && user?.id) {
      dispatch(getOrder({}))
      dispatch(getDrafts({}))
      dispatch(getDocuments({}))
      dispatch(fetchNigerianStates())
      dispatch(getNotifications({ userId: user.id }))
      dispatch(getPendingUsers())
    }
  }, [dispatch, user?.id])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
      if (
        pendingDropdownRef.current &&
        !pendingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPendingDropdownOpen(false)
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
  }

  const userName = user?.firstName

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCreateOrder = () => {
    setActiveView('Orders')
    setIsOrderModalOpen(true)
    console.log('clicked')
  }

  const closeModal = () => {
    setIsNotificationsOpen(false)
    document.body.style.overflow = 'auto'
  }

  const handleSeeMore = (pendingUser: PendingUser) => {
    setSelectedPendingUser(pendingUser)
    setIsUserDetailModalOpen(true)
    setIsPendingDropdownOpen(false)
  }

  const handleApprove = (userId: string) => {
    console.log('Approving user:', userId)
    setLoading(true)

    dispatch(approveUsers({ userId }))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        dispatch(getPendingUsers())
      })
      .catch(err => {
        setLoading(false)
        const errorMessage = err?.msg || err?.response?.data?.detail || ''
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleReject = (userId: string) => {
    console.log('Rejecting user:', userId)
    setLoading(true)

    dispatch(rejectUsers({ userId }))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        dispatch(getPendingUsers())
      })
      .catch(err => {
        setLoading(false)
        const errorMessage = err?.msg || err?.response?.data?.detail || ''
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const getMenuLinks = () => {
    // Default links for all users
    const defaultLinks = [
      { id: 'Home', label: 'Home', icon: <CiHome />, component: <Home /> },
    ]

    // Additional links based on client type
    switch (clientType) {
      case 'Supplier':
        return [
          {
            id: 'Purchase Order',
            label: 'Purchase Order',
            icon: <CiHome />,
            component: <PurchaseOrder />,
          },
          {
            id: 'Settings',
            label: 'Manage Company',
            icon: <RiSettingsLine />,
            component: <Manage />,
          },
        ]
      case 'Buyer':
        return [
          {
            id: 'Purchase Order',
            label: 'Purchase Order',
            icon: <CiHome />,
            component: <PurchaseOrder />,
          },
          {
            id: 'Settings',
            label: 'Manage Company',
            icon: <RiSettingsLine />,
            component: <Manage />,
          },
        ]
      default:
        // Original menu
        return [
          ...defaultLinks,
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
            id: 'Settings',
            label: 'Settings',
            icon: <FiSettings />,
            component: <Settings />,
          },
        ]
    }
  }

  const links = getMenuLinks()

  return (
    <div className="h-screen lg:flex overflow-x-hidden">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0 bg-[#fff]' : '-translate-x-full'
        } md:relative md:translate-x-0 w-20  text-white p-4 border-r border-[#E7E7E7] transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col items-center space-y-6">
          <li>
            <a
              href="/"
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
          className={`text-white p-3 px-6 border-b border-[#E7E7E7] shadow-md flex items-center ${
            !isSidebarOpen ? 'justify-between' : 'justify-start'
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`block md:hidden text-white text-2xl focus:outline-none ${
              isSidebarOpen ? 'relative left-14' : ''
            }`}
          >
            {isSidebarOpen ? (
              <IoClose className="text-primary cursor-pointer" />
            ) : (
              <FiMenu className="text-primary cursor-pointer" />
            )}
          </button>

          {!isSidebarOpen && (
            <h1 className="text-base font-medium text-primary hidden lg:block">
              {activeView}
            </h1>
          )}

          {!isSidebarOpen && (
            <div className="flex items-center">
              <div className="flex lg:gap-4 lg:px-[24px] pr-1 border-r border-[#E7E7E7]">
                {/* <Message /> */}

                <button
                  onClick={() => setIsNotificationsOpen(true)}
                  className="relative"
                >
                  <div className="text-purple absolute text-sm right-1 top-0">
                    {notifications.data.length}
                  </div>
                  <Notifications />
                </button>

                {clientType === 'Supplier' || clientType === 'Buyer' ? (
                  ''
                ) : (
                  <div ref={pendingDropdownRef} className="relative w-full">
                    <button
                      onClick={() =>
                        setIsPendingDropdownOpen(!isPendingDropdownOpen)
                      }
                      className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {pendingUsers?.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {pendingUsers.length}
                        </div>
                      )}
                      <MdPendingActions
                        size={28}
                        className="text-orange-500 text-xl"
                      />
                    </button>

                    {/* Pending Users Dropdown */}
                    {isPendingDropdownOpen && (
                      <div className="absolute top-full -left-28 md:right-0 mt-4 w-80 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="text-sm font-extrabold text-primary">
                            Pending Approvals ({pendingUsers?.length || 0})
                          </h3>
                        </div>
                        {pendingUsers.length > 0 ? (
                          <div className="py-1">
                            {pendingUsers.map((user: PendingUser) => {
                              return (
                                <div
                                  key={user.id}
                                  className="px-4 py-3 hover:bg-gray-50 border-b border-stroke last:border-b-0"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div>
                                          <p className=" text-gray/80 font-semibold text-sm">
                                            {user.firstName} {user.lastName}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleSeeMore(user)}
                                      className="ml-2 px-3 py-1 text-xs hover:underline text-gray/60 rounded-md transition-all "
                                    >
                                      See More
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">
                            No pending approvals
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {/* Pending Users Icon */}
              </div>

              {/* Profile Section */}
              <div
                ref={dropdownRef}
                className="relative flex lg:gap-4 ml-1 lg:mx-[24px] border border-[#E7E7E7] px-3 py-1 items-center rounded-lg cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-primary">{userName}</p>
                  <p className="text-[#98A2B3] text-[10px]">{user?.email}</p>
                  <p className="text-[#98A2B3] text-[10px]">{clientType}</p>
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
          ) : activeView === 'settings' ? (
            <Settings />
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

      {/* User Detail Modal */}
      {isUserDetailModalOpen && selectedPendingUser && (
        <UserAuthenticationModal
          isOpen={isUserDetailModalOpen}
          user={selectedPendingUser}
          onClose={() => setIsUserDetailModalOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <Notification isOpen={isNotificationsOpen} onClose={closeModal} />
      <Loader visible={loading} />
    </div>
  )
}

export default Layout

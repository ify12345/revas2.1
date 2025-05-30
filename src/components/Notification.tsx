/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { format } from 'date-fns'

import { CreateOrderModalProps } from './modal/orders-screen/types'
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '@/api/order'
import { showToast } from './Toast'

const Notification: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [markAllLoading, setMarkAllLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const user = useAppSelector(state => state.auth.user)
  const notifications = useAppSelector(state => state.auth.notifications)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, onClose])

  const handleMarkAsRead = (notificationId: string) => {
    setLoadingId(notificationId)

    dispatch(markNotificationAsRead({ id: notificationId }))
      .unwrap()
      .then(response => {
        setMarkAllLoading(false)
        // console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        onClose()
        if (user && user.id) {
          dispatch(getNotifications({ userId: user.id }))
        }
      })
      .catch(err => {
        setLoadingId(null)
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'

        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleDelete = (notificationId: string) => {
    setLoadingId(notificationId)

    dispatch(deleteNotification({ id: notificationId }))
      .unwrap()
      .then(response => {
        setMarkAllLoading(false)
        // console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        onClose()
        if (user && user.id) {
          dispatch(getNotifications({ userId: user.id }))
        }
      })
      .catch(err => {
        setLoadingId(null)
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'

        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  const handleMarkAllAsRead = () => {
    setMarkAllLoading(true)

    dispatch(markAllNotificationsAsRead())
      .unwrap()
      .then(response => {
        setMarkAllLoading(false)
        // console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        onClose()
        if (user && user.id) {
          dispatch(getNotifications({ userId: user.id }))
        }
      })
      .catch(err => {
        setMarkAllLoading(false)
        const errorMessage =
          err?.msg?.message || err?.msg || 'An error occurred'

        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • h:mm a')
    } catch (error) {
      return dateString
    }
  }

  // Get notification status icon based on type
  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'status_changed':
        return <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 border-blue-500 border"></div>
      default:
        return <div className="w-2 h-2 bg-zinc-300 rounded-full mt-2 border-zinc-300 border"></div>
    }
  }

  // Format the notification title based on type and metadata
  const getNotificationTitle = (notification: any) => {
    switch (notification.type) {
      case 'status_changed':
        return `Order Status Update`
      default:
        return notification.type
          ? notification.type.replace(/_/g, ' ')
          : 'Notification'
    }
  }

  // Get order ID formatted for display
  const getFormattedOrderId = (orderId: any) => {
    if (!orderId) return ''
    // Take first 8 characters of order ID
    return `#${orderId.substring(0, 8)}...`
  }

  if (!isOpen) return null
  // console.log(notifications.data);
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg rounded-xl flex justify-between flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b border-stroke">
          <div className="flex items-center">
            <p className="text-lg font-semibold">Notifications</p>
            {notifications.data.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {notifications.data.filter(n => !n.isRead).length}
              </span>
            )}
          </div>
          {notifications.data.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllLoading}
              className="text-sm text-purple hover:underline disabled:opacity-50 transition-all duration-300"
            >
              {markAllLoading ? 'Marking...' : 'Mark all as read'}
            </button>
          )}
        </div>

        <div className="divide-y divide-stroke overflow-y-auto flex-1">
          {notifications.data.length > 0 ? (
            notifications.data.map(notification => (
              <div
                key={notification.id}
                className={`p-4 flex gap-3 hover:bg-stroke ${!notification.isRead ? 'bg-[#f3f3f3]' : 'bg-white'}`}
              >
                {getStatusIcon(notification.type)}

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">
                      {getNotificationTitle(notification)}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mt-1">
                    {notification.message}
                  </p>

                  {notification.orderId && (
                    <div className="mt-1 flex items-center">
                      <span className="text-xs px-2 py-1 bg-stroke rounded text-gray-600">
                        Order {getFormattedOrderId(notification.orderId)}
                      </span>
                    </div>
                  )}

                  {notification.metadata && (
                    <div className="mt-2 text-xs text-gray-500">
                      {notification.metadata.oldStatus &&
                        notification.metadata.newStatus && (
                          <span className="flex items-center gap-2">
                            Status changed from
                            <span className="font-medium">
                              {notification.metadata.oldStatus.replace(
                                /_/g,
                                ' '
                              )}
                            </span>
                            to
                            <span className="font-medium">
                              {notification.metadata.newStatus.replace(
                                /_/g,
                                ' '
                              )}
                            </span>
                          </span>
                        )}
                    </div>
                  )}

                  <div className="flex gap-3 mt-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs text-blue-600 hover:underline disabled:opacity-50"
                        disabled={loadingId === notification.id}
                      >
                        {loadingId === notification.id
                          ? 'Marking...'
                          : 'Mark as read'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="text-xs text-danger hover:underline disabled:opacity-50"
                      disabled={loadingId === notification.id}
                    >
                      {loadingId === notification.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-500 text-center">
                You have no notifications
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end px-5 gap-3 border-t py-3 border-stroke mt-auto">
          <button
            onClick={onClose}
            className="bg-white text-gray-700 px-4 py-2 border border-stroke rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification

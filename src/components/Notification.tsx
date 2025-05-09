/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'

import { CreateOrderModalProps } from './modal/orders-screen/types'
import { deleteNotification, markAllNotificationsAsRead, markNotificationAsRead } from '@/api/order'

const Notification: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [markAllLoading, setMarkAllLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const notifications = useAppSelector((state) => state.auth.notifications)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      setLoadingId(notificationId)
      await dispatch(markNotificationAsRead({ id: notificationId })).unwrap()
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (notificationId: string) => {
    try {
      setLoadingId(notificationId)
      await dispatch(deleteNotification({ id: notificationId })).unwrap()
    } finally {
      setLoadingId(null)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      setMarkAllLoading(true)
      await dispatch(markAllNotificationsAsRead()).unwrap()
    } finally {
      setMarkAllLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#000] bg-opacity-50 p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg rounded-xl flex justify-between flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b border-stroke">
          <p className="text-lg font-semibold">Notifications</p>
          {notifications.data.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllLoading}
              className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            >
              {markAllLoading ? 'Marking...' : 'Mark all as read'}
            </button>
          )}
        </div>

        <div className="divide-y">
          {notifications.data.length > 0 ? (
            notifications.data.map((notification) => (
              <div
                key={notification.id}
                className="p-4 flex justify-between items-start gap-2 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.body}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-xs text-blue-600 hover:underline disabled:opacity-50"
                      disabled={loadingId === notification.id}
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-xs text-red-600 hover:underline disabled:opacity-50"
                    disabled={loadingId === notification.id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-danger">No notifications</p>
          )}
        </div>

        <div className="flex justify-end px-5 gap-3 border-t py-3 border-stroke">
          <button
            onClick={onClose}
            className="bg-white text-gray-700 px-4 py-2 border border-stroke rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification

import { PendingUser } from '@/types/apiResponse'
import React from 'react'
import { IoClose } from 'react-icons/io5'


interface UserDetailModalProps {
  isOpen: boolean
  user: PendingUser | null
  onClose: () => void
  onApprove: (userId: string) => void
  onReject: (userId: string) => void
}

const UserAuthenticationModal: React.FC<UserDetailModalProps> = ({
  isOpen,
  user,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !user) return null

  const handleApprove = () => {
    onApprove(user.id)
    onClose()
  }

  const handleReject = () => {
    onReject(user.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">New Sign up</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="space-y-4 border-stroke border p-4 rounded-xl">
          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <label className="block text-sm font-medium text-gray/40 mb-1">
              First Name
            </label>
            <p className="text-sm text-gray-900">
              {user.firstName}
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <label className="block text-sm font-medium text-gray/40 mb-1">
              Last Name
            </label>
            <p className="text-sm text-gray-900">
              {user.lastName}
            </p>
          </div>

           <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <label className="block text-sm font-medium text-gray/40 mb-1">
              Client Type
            </label>
            <p className="text-sm text-gray-900">{user.clientType}</p>
          </div>

           <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <label className="block text-sm font-medium text-gray/40 mb-1">
              Role
            </label>
            <p className="text-sm text-gray-900">{user.role}</p>
          </div>

           {user.whatsappNumber && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <p className="text-sm text-gray-900 border border-gray rounded-md p-2">{user.whatsappNumber}</p>
            </div>
          )}

          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <label className="block text-sm font-medium text-gray/40 mb-1">
              Email Address
            </label>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>

         <div className="border-stroke border-t pt-4">

        <div className="flex gap-3 items-center justify-center w-full lg:max-w-md mx-auto">
             <button
            onClick={handleReject}
            className="flex-1  text-primary px-4 py-2 rounded-md hover:bg-primary border-stroke border hover:text-white transition-colors duration-500 hover:scale-95"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-gray transition-colors duration-500 hover:scale-95"
          >
            Approve
          </button>
         
        </div>
         </div>
        </div>

      </div>
    </div>
  )
}

export default UserAuthenticationModal
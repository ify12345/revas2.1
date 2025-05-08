/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import CustomInput from './CustomInput'
import { GoTrash } from 'react-icons/go'

export default function Users() {
  const user = [
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
  ]
  const invited = [
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
    {
      name: 'Tobi Kayode (You)',
      email: 'tobikayode@wonder.com',
    },
  ]

  return (
    <div>
      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 my-6">
        <div className="lg:w-[40%] w-full">
          <p>Active Users</p>
          <p className="text-primaryLight w-full lg:max-w-[358px]">
            Users who has successfully completed setup of their account.
          </p>
          <button className="bg-primary rounded-lg py-2 px-4 text-white mt-4">
            Invite new user
          </button>
        </div>
        <div className="lg:w-[60%] w-full border border-stroke rounded-lg flex flex-col gap-4 p-[30px] ">
          {user.map((item, i) => {
            return (
              <div
                key={i}
                className="flex justify-between border-b border-stroke pb-5 w-full items-center"
              >
                <div className="flex flex-col">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm text-gray_light">{item.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    className="p-2 border-stroke border rounded-md text-gray_light focus:ring-1 focus:ring-primary"
                    name=""
                    id=""
                  >
                    <option value="">Commercial</option>
                  </select>
                  <button className="" title="delete user">
                    <GoTrash color="red" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 my-6">
        <div className="lg:w-[40%] w-full">
          <p>Pending Invites</p>
          <p className="text-primaryLight w-full lg:max-w-[358px] font-thin">
            Users who have been invited to work in Revas under [Company Name]
            and are pending account setup.
          </p>
        </div>
        <div className="lg:w-[60%] w-full border border-stroke rounded-lg flex flex-col gap-4 p-[30px] ">
          {invited.map((item, i) => {
            return (
              <div
                key={i}
                className="flex justify-between border-b border-stroke pb-5 w-full items-center"
              >
                <div className="flex flex-col">
                  <p className="text-sm">
                    {item.name}{' '}
                    <span className="bg-stroke rounded-lg text-[8px] p-2 text-danger">
                      Pending
                    </span>
                  </p>
                  <p className="text-sm text-gray_light">{item.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:scale-95 transition-all duration-300">
                    Resend Invite
                  </button>
                  <button
                    className="p-2 bg-stroke text-danger rounded-lg hover:scale-95 transition-all duration-300"
                    title="delete invite"
                  >
                    Revoke Invite
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

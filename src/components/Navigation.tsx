import { Logo } from '@/assets/asset.js'
import avatar from '@/assets/avatar.png'
import * as React from 'react';


export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center pt-[56px] pb-[44px] px-6 lg:px-[88px]">
      <div className="w-[128px]">
        <img src={Logo} alt="Logo" className="object-cover w-full h-full" />
      </div>

      <div className="flex items-center gap-3">
        <div className="size-[32px] rounded-full">
          <img src={avatar} alt="Logo" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col">
            <p className="text-primary leading-[17px]">Odili wisdom</p>
            <p className="text-primaryLight text-[12px] font-normal">Account Manager</p>
        </div>
      </div>
    </nav>
  )
}

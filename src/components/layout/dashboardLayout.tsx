// Layout.tsx

import { ReactNode } from 'react'
import logo from '@/assets/images/dash-icon.png'
import { CiHome } from 'react-icons/ci'
import { CiDeliveryTruck } from 'react-icons/ci'
import { MdPeopleOutline } from 'react-icons/md'
import { IoReceiptOutline } from 'react-icons/io5'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
// Type for the props
interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-[6%] bg-gray-800 text-white p-4 border-r border-[#E7E7E7]">
        <ul className="flex flex-col items-center space-y-6">
          <li>
            <a
              href="#home"
              className="flex items-center space-x-3 text-lg max-w-[52px]"
            >
              <img src={logo} className="w-full" alt="" />
            </a>
          </li>
          <li>
            <a
              href="#home"
              className="flex items-center space-x-3 text-lg p-3 bg-primary rounded-2xl"
            >
              <CiHome color="white" />
            </a>
          </li>
          <li>
            <a href="#about" className="flex items-center space-x-3 text-lg">
              <CiDeliveryTruck />
            </a>
          </li>
          <li>
            <a href="#about" className="flex items-center space-x-3 text-lg">
              <MdPeopleOutline />
            </a>
          </li>
          <li>
            <a href="#about" className="flex items-center space-x-3 text-lg">
              <IoReceiptOutline />
            </a>
          </li>
          <li className="pt-[60px] border-t border-[#E7E7E7]">
            <a href="#about" className="flex items-center space-x-3 text-lg">
              <TfiHeadphoneAlt />
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col">
        {/* Navbar */}
        <header className="bg-green-500 text-white p-6 border-b border-[#E7E7E7] shadow-md flex justify-between w-full items-center">
          <h1 className="text-base font-medium">Home</h1>
          <div className="flex items-center">
            <div className="flex gap-4 px-[24px] border-r border-[#E7E7E7]">
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
                  d="M23.9661 16.3327C23.9661 15.0066 23.4394 13.7348 22.5017 12.7971C21.564 11.8595 20.2922 11.3327 18.9661 11.3327C17.6401 11.3327 16.3683 11.8595 15.4306 12.7971C14.4929 13.7348 13.9661 15.0066 13.9661 16.3327V22.9993H23.9661V16.3327ZM25.6328 23.5552L25.9661 23.9994C26.0126 24.0613 26.0408 24.1349 26.0478 24.2119C26.0547 24.289 26.0401 24.3665 26.0055 24.4357C25.9709 24.5049 25.9177 24.5631 25.8519 24.6038C25.786 24.6445 25.7102 24.666 25.6328 24.666H12.2995C12.2221 24.666 12.1462 24.6445 12.0804 24.6038C12.0146 24.5631 11.9614 24.5049 11.9268 24.4357C11.8922 24.3665 11.8775 24.289 11.8845 24.2119C11.8914 24.1349 11.9197 24.0613 11.9661 23.9994L12.2995 23.5552V16.3327C12.2995 14.5646 13.0019 12.8689 14.2521 11.6186C15.5023 10.3684 17.198 9.66602 18.9661 9.66602C20.7343 9.66602 22.4299 10.3684 23.6802 11.6186C24.9304 12.8689 25.6328 14.5646 25.6328 16.3327V23.5552ZM16.8828 25.4993H21.0495C21.0495 26.0519 20.83 26.5818 20.4393 26.9725C20.0486 27.3632 19.5187 27.5827 18.9661 27.5827C18.4136 27.5827 17.8837 27.3632 17.493 26.9725C17.1023 26.5818 16.8828 26.0519 16.8828 25.4993Z"
                  fill="#334155"
                />
              </svg>
            </div>
            <div className="flex gap-4 mx-[24px] border border-[#E7E7E7] p-[4px] items-center rounded-lg ">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.96875 14.25C0.96875 6.37995 7.3487 0 15.2188 0C23.0888 0 29.4688 6.37995 29.4688 14.25V15.75C29.4688 23.6201 23.0888 30 15.2188 30C7.3487 30 0.96875 23.6201 0.96875 15.75V14.25Z" fill="#F1F5F9"/>
<path d="M11.9495 14.3685C12.2578 13.2179 13.4406 12.0352 14.5912 11.7268L21.7645 9.80445C22.9151 9.4961 23.5979 10.1789 23.2896 11.3295L21.3672 18.5029C21.0588 19.6535 19.8761 20.8362 18.7255 21.1445L11.5521 23.0669C10.4015 23.3753 9.71876 22.6925 10.0271 21.5419L11.9495 14.3685Z" fill="#9E77ED"/>
<path d="M9.0745 11.4935C9.38285 10.3429 10.5656 9.16019 11.7162 8.85184L18.8895 6.92945C20.0401 6.6211 20.7229 7.30388 20.4146 8.45448L18.4922 15.6279C18.1838 16.7785 17.0011 17.9612 15.8505 18.2695L8.67714 20.1919C7.52654 20.5003 6.84376 19.8175 7.15211 18.6669L9.0745 11.4935Z" fill="#6941C6"/>
            </svg>
            <div className="flex flex-col">
                <p className='text-sm'>John Doe</p>
                <p className="text-[#98A2B3] text-[10px]">
                Sonder Company
                </p>
            </div>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14L8 10H16L12 14Z" fill="#98A2B3"/>
</svg>

            </div>
          </div>
        </header>

        {/* Body Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}

export default Layout

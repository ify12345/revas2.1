import onboarding from '@/assets/images/onboarding.png';
import background from '@/assets/images/background.png';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import CustomInput from '@/components/CustomInput';


export default function Signup() {
  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden p-7 max-h-screen">
      <div className="hidden lg:block w-1/2 rounded-2xl max-h-full relative">
        <img src={onboarding} className="rounded-2xl w-full h-full" alt="" />
        <img
          src={background}
          className="absolute rounded-2xl w-full h-full inset-0"
          alt=""
        />
        <div className="flex flex-col inset-0 justify-end text-white absolute z-30 px-[40px] gap-[17px] py-10">
          <p className="text-[#fff] font-bold text-3xl">
            “Implementing Revas B2B recycling technology has revolutionized our
            operations. It provides real-time tracking, boosting efficiency and
            supporting our sustainability goals”
          </p>
          <div className="text-[#fff]">
            <p className="text-lg">Emily Johnson,</p>
            <p className="text">Director of Operations, WasteNot Solutions</p>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.15781 16C1.15781 7.38436 8.14217 0.4 16.7578 0.4C25.3735 0.4 32.3578 7.38436 32.3578 16C32.3578 24.6156 25.3735 31.6 16.7578 31.6C8.14217 31.6 1.15781 24.6156 1.15781 16Z"
                stroke="#9B9B9B"
                stroke-width="0.8"
              />
              <path
                d="M21.4219 9.49608L19.9979 8.08008L12.0859 16.0001L20.0059 23.9201L21.4219 22.5041L14.9179 16.0001L21.4219 9.49608Z"
                fill="#9B9B9B"
              />
            </svg>
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.55625 16C0.55625 7.38436 7.54061 0.4 16.1562 0.4C24.7719 0.4 31.7563 7.38436 31.7563 16C31.7563 24.6156 24.7719 31.6 16.1562 31.6C7.54061 31.6 0.55625 24.6156 0.55625 16Z"
                stroke="#9B9B9B"
                stroke-width="0.8"
              />
              <path
                d="M11.4453 22.584L12.8613 24L20.8613 16L12.8613 8L11.4453 9.416L18.0293 16L11.4453 22.584Z"
                fill="#9B9B9B"
              />
            </svg>
          </div>
        </div>
      </div>




      <div className="w-full lg:w-1/2 flex flex-col lg:p-[88px]">
        <img src={logo} className="max-w-[172px] mb-[60px]" alt="" />
        <form action="" className="text-[#98A2B3] flex flex-col gap-[24px]">
          <p className="text-primary text-3xl">Create your account</p>

          {/* First Name and Last Name */}
          <div className="w-full flex gap-[14px]">
            <div className="w-1/2">
              <CustomInput
                label="First Name"
                type="text"
                placeholder="First name"
                required
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                label="Last Name"
                type="text"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Role */}
          <CustomInput
            label="Role"
            type="text"
            placeholder="Manager"
            required
          />

          {/* Email Address */}
          <CustomInput
            label="Email Address"
            type="email"
            placeholder="Enter company email"
            required
          />

          {/* Password */}
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter password"
            required
          />

          {/* Repeat Password */}
          <CustomInput
            label="Repeat Password"
            type="password"
            placeholder="Repeat password"
            required
          />

          {/* Submit Button */}
          <Link
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            to="/sign-in"
          >
            Get started
          </Link>
        </form>
      </div>
    </div>
  );
}
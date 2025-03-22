 
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import AuthPiece from '@/components/AuthPiece'
import CheckSvg from '@/components/svg/Check'

export default function ResetSuccess() {
  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden lg:p-7 max-h-screen">
      <AuthPiece />

      <div className="w-full lg:w-1/2 flex flex-col lg:p-[88px] overflow-y-auto p-7">
        <img src={logo} className="max-w-[172px] mb-[60px]" alt="" />
        <div className="text-[#98A2B3] flex flex-col gap-[24px] items-center">
          <CheckSvg />
          <p className="text-primary text-3xl text-center">Congratulations!</p>
          <p className="text-gray_light text-center font-extralight">
            Password created successfully.
          </p>

          <Link
            to="/sign-in"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex w-full"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

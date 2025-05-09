import * as React from 'react'
import { FiMenu, FiX } from 'react-icons/fi' // Importing icons from react-icons
import logo from '@/assets/images/logo-white.png'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="bg-primary text-white px-5 lg:px-[90px] py-[20px] relative z-40">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="max-w-[172px]" alt="Logo" />
        </Link>

        <div className="hidden lg:flex gap-[100px] text-sm">
          <Link to="/about-us">About Us</Link>
          <Link to="/how" className="block">
            How it Works
          </Link>
          <Link to="/categories" className="block">
            Browse Categories
          </Link>
        </div>

        <div className="hidden lg:flex gap-3 dm-mono-medium capitalize">
          <Link
            to="/sign-up"
            className="py-[12px] px-[30px] rounded-lg capitalize text-sm text-white bg-primary transition-colors duration-300 hover:text-white hover:border-white hover:border"
          >
            SIGN UP
          </Link>
          <Link
            to="/sign-in"
            className="py-[12px] px-[30px] border border-white rounded-lg capitalize text-sm font-medium text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            SIGN IN
          </Link>
        </div>

        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-5 mt-5 text-sm">
          <Link to="" className="block">
            About Us
          </Link>
          <Link to="/how" className="block">
            How it Works
          </Link>
          <Link to="/categories" className="block">
            Browse Categories
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-6 rounded-lg text-white bg-primary border border-white transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            SIGN UP
          </Link>
          <Link
            to="/sign-in"
            className="py-2 px-6 border border-white rounded-lg text-white bg-primary transition-colors duration-300 hover:text-primary hover:bg-white"
          >
            SIGN IN
          </Link>
        </div>
      )}
    </nav>
  )
}

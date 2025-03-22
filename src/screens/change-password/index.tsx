/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import logo from '@/assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CustomInput from '@/components/CustomInput'
import { useAppDispatch } from '@/redux/store'
import { resetPassword } from '@/api/auth'
import { showToast } from '@/components/Toast'
import AuthPiece from '@/components/AuthPiece'

interface FormData {
  confirmPassword: string
  password: string
}

interface resetPayload {
  confirmPassword: string
  password: string
  pin: string
}

export default function ChangePassword() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const pin = location.state?.pin.code
  const [formData, setFormData] = useState<FormData>({
    confirmPassword: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: resetPayload = {
      confirmPassword: formData.confirmPassword,
      password: formData.password,
      pin,
    }

    console.log(payload)
    setLoading(true)

    dispatch(resetPassword(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        navigate('/reset-success')
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg || err?.response?.data?.detail || 'Invalid password'
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden lg:p-7 max-h-screen">
      <AuthPiece />

      <div className="w-full lg:w-1/2 flex flex-col lg:p-[88px] overflow-y-auto p-7">
        <img src={logo} className="max-w-[172px] mb-[60px]" alt="" />
        <form
          action=""
          className="text-[#98A2B3] flex flex-col gap-[24px]"
          onSubmit={handleSubmit}
        >
          <p className="text-primary text-3xl">Create new password</p>
          <p className="text-gray_light">
            Create a strong and secure password for signing in to your Revas
            account.
          </p>

          <CustomInput
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            disabled={loading}
          >
            {loading ? 'Changing password...' : 'Change password'}
          </button>
        </form>
        {/* <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/account-manager/sign-up" className="text-primary">
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  )
}

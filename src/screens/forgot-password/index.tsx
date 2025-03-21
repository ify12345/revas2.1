import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import AuthPiece from '@/components/authPiece'
import CustomInput from '@/components/CustomInput'
import { useAppDispatch } from '@/redux/store'
import { forgotPassword } from '@/api/auth'
import { showToast } from '@/components/Toast'

interface FormData {
  email: string
}

interface forgotPasswordPayload {
  email: string
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    email: '',
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

    const payload: forgotPasswordPayload = {
      email: formData.email,
    }

    console.log(payload)
    setLoading(true)

    dispatch(forgotPassword(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        navigate('/reset-password')
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg || err?.response?.data?.detail || 'Invalid email'
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
          <div className="space-y-2">
            <p className="text-primary text-3xl">Forgot Password</p>
            <p className="text-sm">
              Enter the email address you registered with and we will send you a
              link to create a new password.
            </p>
          </div>
          <CustomInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter company email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            disabled={loading}
          >
            {loading ? 'Sending link...' : 'Send link'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray_light space-x-1">
        Remember password?

          <Link to="/sign-in" className="text-primary">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import CustomInput from '@/components/CustomInput'
import { useAppDispatch } from '@/redux/store'
import { login } from '@/api/auth'
import { showToast } from '@/components/Toast'
import AuthPiece from '@/components/AuthPiece'

interface FormData {
  email: string
  password: string
}

interface LoginPayload {
  email: string
  password: string
}

export default function Signin() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
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

    const payload: LoginPayload = {
      email: formData.email,
      password: formData.password,
    }

    console.log(payload)
    setLoading(true)

    dispatch(login(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
        showToast({ type: 'success', msg: response.message })
        navigate('/')
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg || err?.response?.data?.detail || 'Invalid email or password'
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
          <p className="text-primary text-3xl">Sign in</p>

          <CustomInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter company email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p className="text-sm text-end">
            Forgot Password?{' '}
            <Link to="/forgot-password" className="text-primary">
              Recover
            </Link>
          </p>

          <button
            type="submit"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/account-manager/sign-up" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import CustomInput from '@/components/CustomInput'
import { useAppDispatch } from '@/redux/store'
import { registerUser } from '@/api/auth'
import { showToast } from '@/components/Toast'
import { RegisterPayload } from '@/types/api'
import { FormData } from '@/types'
import { useNavigate } from 'react-router-dom'
import AuthPiece from '@/components/AuthPiece'
import Loader from '@/components/Loader'

export default function UsersSignup() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    clientType: '',
    repeatPassword: '',
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

    // You might want to add validation here
    if (formData.password !== formData.repeatPassword) {
      showToast({ type: 'error', msg: "Passwords don't match" })
      return
    }

    const payload: RegisterPayload = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      clientType: formData.clientType,
    }

    // console.log(payload)
    setLoading(true)

    dispatch(registerUser(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        // console.log('Success:', response)
        // console.log('Role:', payload.role)
        showToast({ type: 'success', msg: response.message })
        navigate('/sign-in')
      })
      .catch(err => {
        setLoading(false)
        const errorMessage =
          err?.msg || err?.response?.data?.detail || 'An error occurred'
        console.error('Error:', err)
        showToast({ type: 'error', msg: errorMessage })
      })
  }

  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden lg:p-7 max-h-screen ">
      <AuthPiece />

      <div className="w-full lg:w-1/2 flex flex-col lg:p-[28px] p-7 overflow-y-auto h-screen">
        <img src={logo} className="max-w-[172px] mb-[60px]" alt="" />
        <form
          action=""
          className="text-[#98A2B3] flex flex-col gap-[24px]"
          onSubmit={handleSubmit}
        >
          <p className="text-primary text-3xl">Create your account</p>

          {/* First Name and Last Name */}
          <div className="w-full flex flex-col lg:flex-row gap-[14px]">
            <div className="w-full lg:w-1/2">
              <CustomInput
                label="First Name"
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full lg:w-1/2">
              <CustomInput
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <CustomInput
            label="Client type"
            type="select"
            name="clientType"
            placeholder="Select client type"
            value={formData.clientType}
            onChange={handleChange}
            required
            options={[
              { label: 'Buyer', value: 'Buyer' },
              { label: 'Supplier', value: 'Supplier' },
            ]}
          />

          <CustomInput
            label="Role"
            type="text"
            name="role"
            placeholder="Manager"
            value={formData.role}
            onChange={handleChange}
            required
          />

          {/* Email Address */}
          <CustomInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter company email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Repeat Password */}
          <CustomInput
            label="Repeat Password"
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Get started'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray_light">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-primary font-extralight">
            Sign in
          </Link>
        </p>
      </div>
      <Loader visible={loading}/>
    </div>
  )
}

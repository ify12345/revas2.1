import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'
import AuthPiece from '@/components/AuthPiece'
import CustomInput from '@/components/CustomInput'

interface FormData {
  code: string
}

interface forgotPasswordPayload {
  code: string
}

export default function ResetPin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    code: '',
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
      code: formData.code,
    }

    console.log(payload)
    setLoading(true)
    navigate('/change-password', { state: { pin: payload } })
    setLoading(false)
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
            <p className="text-sm">Enter the code sent to your mail</p>
          </div>
          <CustomInput
            label="Code"
            type="text"
            name="code"
            placeholder="Enter code"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="py-2.5 rounded-md bg-primary text-[#fff] justify-center items-center flex"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Reset password'}
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray_light space-x-1">
          Remember password?
          <Link to="/sign-in" className="text-primary">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

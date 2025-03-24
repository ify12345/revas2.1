/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import logo from '@/assets/logo.png'
import img from '@/assets/images/profile.png'
import { useNavigate } from 'react-router-dom'
import CustomInput from '@/components/CustomInput'
import AuthPiece from '@/components/AuthPiece'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { showToast } from '@/components/Toast'
import { RegisterProductPayload } from '@/types/api'
import { registerProduct } from '@/api/products'
import { useDropzone } from 'react-dropzone'

export default function SetUp() {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)
  console.log(user)
  const userName = user?.firstName
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = function () {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop, accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'] } })

  const [formData, setFormData] = useState<RegisterProductPayload>({
    companyName: '',
    product: '',
    capacity: undefined,
    price: undefined,
    location: '',
    image: '',
  })

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (acceptedFiles.length === 0) {
      showToast({ type: 'error', msg: 'Please upload an image' })
      return
    }
  
    try {
      setLoading(true)
  

      const formDataUpload = new FormData()

      formDataUpload.append('companyName', formData.companyName || '')
      formDataUpload.append('product', formData.product || '')
      formDataUpload.append('capacity', formData.capacity?.toString() || '')
      formDataUpload.append('price', formData.price?.toString() || '')
      formDataUpload.append('location', formData.location || '')
  
   
      formDataUpload.append('image', acceptedFiles[0], acceptedFiles[0].name)
  
   
      const formDataObject = Object.fromEntries(formDataUpload as any);
      console.log('FormData Contents:', formDataObject);
  
    
      const response = await dispatch(registerProduct(formDataObject)).unwrap()
      
      showToast({ type: 'success', msg: response.message })
      navigate('/')
    } catch (err: any) {
      const errorMessage = err?.msg || err?.response?.data?.detail || 'An error occurred'
      console.error('Error:', err)
      showToast({ type: 'error', msg: errorMessage })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden p-7 max-h-screen items-center">
      <AuthPiece />
      <div className="w-full lg:w-1/2 flex flex-col lg:p-[88px]">
        <img src={logo} className="max-w-[172px] mb-[60px]" alt="Logo" />
        <form
          onSubmit={handleSubmit}
          className="text-[#98A2B3] flex flex-col gap-[24px] items-center lg:items-start"
        >
          <p className="text-primary text-3xl">Welcome {userName}👋</p>
          <p className="text-primary text-lg">Setup your account</p>

          {/* Image Upload Section */}
          <div className="flex flex-col gap-1 items-center lg:items-start">
            <p className="text-primaryLight text-base">Company Logo</p>
            <div {...getRootProps()} className="flex flex-col lg:flex-row items-center lg:items-start">
              <div className="max-w-[80px] max-h-[80px]">
                <img
                  src={preview || img}
                  className="w-full object-cover rounded-md"
                  alt="Company Logo"
                />
              </div>
              <div className="p-3 items-center lg:items-start flex flex-col">
                <button
                  type="button"
                  className="rounded-md text-white hover:text-primary hover:bg-primaryLight p-1.5 bg-primary"
                >
                  Upload Image
                </button>
                <p className="text-primaryLight text-sm">
                  .png, .jpeg files up to 2MB. Recommended size is 50x50px.
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  {...getInputProps()}
                />
              </div>
            </div>
          </div>

          {/* Rest of the form remains the same */}
          <CustomInput
            label="Company Name"
            type="text"
            placeholder="Revas?"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Product"
            type="text"
            placeholder="PET flakes"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Capacity (MT/month)"
            type="number"
            placeholder="1000"
            name="capacity"
            value={formData.capacity ?? ''}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Price/tonne (USD)"
            type="number"
            placeholder="123"
            name="price"
            value={formData.price ?? ''}
            onChange={handleChange}
            required
          />

          <CustomInput
            label="Location"
            type="text"
            placeholder="United Kingdom"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="py-2.5 w-full rounded-md bg-primary text-[#fff] justify-center items-center flex cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}
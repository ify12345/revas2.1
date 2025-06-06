import React, { useCallback, useState } from 'react'
import { SlCloudUpload } from 'react-icons/sl'
import { useDropzone } from 'react-dropzone'
import CustomInput from './CustomInput'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { updateProduct } from '@/api/products'
import { showToast } from '@/components/Toast'

export default function CompanyProfile() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  // console.log(user)

  const [formData, setFormData] = useState({
    companyName: '',
    product: '',
    capacity: '',
    location: '',
    image: '',
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'] },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    if (
      !formData.companyName ||
      !formData.product ||
      !formData.capacity ||
      !formData.location
    ) {
      showToast({ type: 'error', msg: 'Please fill out all fields' })
      return
    }

    if (acceptedFiles.length === 0) {
      showToast({ type: 'error', msg: 'Please upload a logo image' })
      return
    }

    const payload = {
      ...formData,
      product: [formData.product],
      capacity: Number(formData.capacity),
      image: acceptedFiles[0],
    }

    setLoading(true)
    dispatch(updateProduct(payload))
      .unwrap()
      .then(response => {
        showToast({ type: 'success', msg: response.message })
        setLoading(false)
      })
      .catch(err => {
        const message =
          err?.msg || err?.response?.data?.detail || 'Update failed'
        showToast({ type: 'error', msg: message })
        setLoading(false)
      })
  }

  return (
    <div className="">
      <div className="flex justify-between mt-6">
        <p className="text-lg">Company Profile</p>
        <button
          onClick={handleUpdate}
          className="bg-primary rounded-lg py-2 px-4 text-white"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>

      <p className="text-sm text-primaryLight border-stroke border-b pb-6 mb-6">
        Keep your company details up to date in Revas so that we can keep your
        deals moving quickly.
      </p>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full">
          <p>Company Name</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput
            name="companyName"
            placeholder={`${user.firstName} ${user.lastName}`}
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full flex flex-col">
          <p>Brand logo</p>
          <p className="text-primaryLight">
            This will be displayed on your profile
          </p>
        </div>
        <div className="lg:w-[60%] w-full flex gap-5 items-center">
          <div className="bg-[#D9D9D9] size-[100px] rounded-full overflow-hidden">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            {...getRootProps()}
            className="rounded-lg border border-dashed border-stroke flex flex-col gap-1 py-[16px] justify-center items-center px-[55px] text-sm font-extralight cursor-pointer"
          >
            <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center p-4">
              <SlCloudUpload />
            </div>
            <p>
              Click to upload{' '}
              <span className="text-gray_light">or drag and drop</span>
            </p>
            <p className="text-[#B3B3B3]">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
            <input type="file" {...getInputProps()} className="hidden" />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Products</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput
            name="product"
            placeholder="products"
            value={formData.product}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Capacity (MT/month)</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput
            name="capacity"
            placeholder="800"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row border-b border-stroke pb-6 mb-6">
        <div className="lg:w-[40%] w-full text-gray_light">
          <p>Location</p>
        </div>
        <div className="lg:w-[60%] w-full">
          <CustomInput
            name="location"
            placeholder="United Kingdom"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

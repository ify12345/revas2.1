/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react'
import logo from '@/assets/logo.png'
import img from '@/assets/images/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '@/components/CustomInput'
import AuthPiece from '@/components/AuthPiece'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { showToast } from '@/components/Toast'
import { RegisterProductPayload } from '@/types/api'
import { registerProduct } from '@/api/products'
import { useDropzone } from 'react-dropzone'
import { fetchNigerianStates } from '@/api/auth'

// Define the product options organized by category
const productOptions = [
  {
    category: 'Plastics',
    options: [
      { label: 'PET Bales', value: 'PET Bales' },
      { label: 'Pet Flakes', value: 'Pet Flakes' },
      { label: 'Granules(pellets)', value: 'Granules(pellets)' },
      {
        label: 'High Density Polyethylene (HDPE)',
        value: 'High Density Polyethylene (HDPE)',
      },
      { label: 'Polyvinyl Chloride (PVC)', value: 'Polyvinyl Chloride (PVC)' },
      { label: 'Polypropylene (PP)', value: 'Polypropylene (PP)' },
    ],
  },
  {
    category: 'Metal',
    options: [
      { label: 'Aluminium', value: 'Aluminium' },
      { label: 'UBC(Cans)', value: 'UBC(Cans)' },
      { label: 'Ingots', value: 'Ingots' },
      { label: 'Scraps', value: 'Scraps' },
      { label: 'Sheets', value: 'Sheets' },
      { label: 'Castings', value: 'Castings' },
    ],
  },
  {
    category: 'Paper',
    options: [
      { label: 'White Office Paper', value: 'White Office Paper' },
      { label: 'Newspaper', value: 'Newspaper' },
      { label: 'Colored Office Paper', value: 'Colored Office Paper' },
      { label: 'Cardboard', value: 'Cardboard' },
      { label: 'White Computer Paper', value: 'White Computer Paper' },
      { label: 'Magazines', value: 'Magazines' },
      { label: 'Catalogs', value: 'Catalogs' },
      { label: 'Phone Books', value: 'Phone Books' },
      { label: 'Cartons', value: 'Cartons' },
    ],
  },
]

export default function SetUp() {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchNigerianStates())
  }, [dispatch])
  const states = useAppSelector(state => state.auth.states)
  // console.log(user)
  const userName = user?.firstName

  const [loading, setLoading] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  // State for selected products
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = function () {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg', '.jpg'] },
    })

  const [formData, setFormData] = useState<RegisterProductPayload>({
    companyName: '',
    product: undefined,
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

  // Handle product multi-select changes
  const handleProductChange = (selectedOptions: string[]) => {
    setSelectedProducts(selectedOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form inputs
    if (acceptedFiles.length === 0) {
      showToast({ type: 'error', msg: 'Please upload an image' })
      return
    }

    if (selectedProducts.length === 0) {
      showToast({ type: 'error', msg: 'Please select at least one product' })
      return
    }

    // Create payload with form data
    const payload = {
      companyName: formData.companyName || '',
      capacity: Number(formData.capacity),
      price: Number(formData.price),
      location: formData.location || '',
      product: selectedProducts, // Store the array of selected products
      image: acceptedFiles[0], // Add the image file directly to the payload
    }

    console.log('Payload with image:', payload)
    setLoading(true)
    dispatch(registerProduct(payload))
      .unwrap()
      .then(response => {
        setLoading(false)
        console.log('Success:', response)
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
    <div className="w-full flex flex-col lg:flex-row overflow-hidden lg:p-7 max-h-screen">
      <AuthPiece />
      <div className="w-full lg:w-1/2 flex flex-col lg:p-[28px] p-7 overflow-y-auto max-h-screen">
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
            <div
              {...getRootProps()}
              className="flex flex-col lg:flex-row items-center lg:items-start"
            >
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

          {/* Rest of the form */}
          <CustomInput
            label="Company Name"
            type="text"
            placeholder="Revas?"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          {/* Multi-select product input */}
          <CustomInput
            label="Products"
            type="multiselect"
            placeholder="Select products"
            multiSelectOptions={productOptions}
            selectedOptions={selectedProducts}
            onMultiSelectChange={handleProductChange}
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
            type="select"
            options={states?.map(state => ({ label: state, value: state }))}
            placeholder="Select your location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-2 w-full">
            <button
              type="submit"
              className="py-2.5 w-full rounded-md bg-primary text-[#fff] justify-center items-center flex cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link
              className="text-primary mx-auto py-2.5 w-full rounded-md border border-primary justify-center items-center flex cursor-pointer"
              to="/sign-in"
            >
              Skip
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

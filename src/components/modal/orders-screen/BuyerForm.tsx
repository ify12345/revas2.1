/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import CustomInput from '@/components/CustomInput'
import ProfitMarginDisplay from './ProfitMarginDisplay'
import SupplierSummary from './SupplierSummary'
import { FormProps, OrderFormData } from './types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Product } from '@/types/product'
import { FiSearch } from 'react-icons/fi'
import { clearProducts, clearSupplierProducts, selectProduct } from '@/redux/reducers/products'
import { searchBuyerProduct, searchSupplierProduct } from '@/api/products'

// Define the form values interface
interface BuyerFormValues {
  buyerName: string;
  buyerId: string;
  supplierId: string;
  email?: string;  
  buyerLocation: string;
  supplierLocation: string;
  product: string;
  paymentTerms: string;
  capacity: number | string;
  pricePerTonne: number | string;
  shippingType: string;
  supplierName: string;
  buyerPrice: number | string;
  supplierPrice: number | string;
  freightCost: number | string;
  otherCosts: number | string;
  negotiatePrice?: boolean;
  priceRange?: number | string;
  savedStatus?: string;
}




// Validation schema using Yup
const validationSchema = Yup.object({
  buyerName: Yup.string()
    .min(2, 'Buyer name must be at least 2 characters')
    .required('Buyer name is required'),
  buyerLocation: Yup.string()
    .min(2, 'Location must be at least 2 characters')
    .required('Buyer location is required'),
  product: Yup.string().required('Product selection is required'),
  capacity: Yup.number()
    .positive('Capacity must be a positive number')
    .required('Capacity is required'),
  pricePerTonne: Yup.number()
    .positive('Price per tonne must be a positive number')
    .required('Price per tonne is required'),
  shippingType: Yup.string().required('Shipping type is required'),
  paymentTerms: Yup.string().required('Payment terms are required'),
  supplierName: Yup.string()
    .min(2, 'Supplier name must be at least 2 characters')
    .required('Supplier name is required'),
  supplierLocation: Yup.string()
    .min(2, 'Location must be at least 2 characters')
    .required('Supplier location is required'),
  buyerPrice: Yup.number()
    .positive('Buyer price must be a positive number')
    .required('Buyer price is required'),
  supplierPrice: Yup.number()
    .positive('Supplier price must be a positive number')
    .required('Supplier price is required'),
  freightCost: Yup.number()
    .min(0, 'Freight cost must be 0 or greater')
    .required('Freight cost is required'),
  otherCosts: Yup.number()
    .min(0, 'Other costs must be 0 or greater')
    .required('Other costs is required'),
})

const BuyerForm: React.FC<FormProps> = ({
  formData,
  setFormData,
  handleChange,
  handleSelectChange,
  handleInputFocus,
  profitMargin,
  modalTitle,
  user,
}) => {
  const dispatch = useAppDispatch()
  const { products, sellerProducts, loading } = useAppSelector(
    state => state.product
  )
  const states = useAppSelector(state => state.auth.states)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('')
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false)

  // Initial form values
  const initialValues: BuyerFormValues = {
    buyerName: formData.buyerName || '',
    buyerId: formData.buyerId || '',
    buyerLocation: formData.buyerLocation || '',
    product: formData.product || '',
    capacity: formData.capacity || '',
    pricePerTonne: formData.pricePerTonne || '',
    shippingType: formData.shippingType || 'FOB',
    paymentTerms: formData.paymentTerms || '',
    supplierName: formData.supplierName || '',
    supplierId: formData.supplierId || '',
    supplierLocation: formData.supplierLocation || '',
    buyerPrice: formData.buyerPrice || '',
    supplierPrice: formData.supplierPrice || '',
    freightCost: formData.freightCost || '',
    otherCosts: formData.otherCosts || '',
  }

  useEffect(() => {
    const dropdownRef = document.getElementById('search-dropdown')

    const handleClickOutside = (event: any) => {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { value } = e.target
    setSearchTerm(value)
    setFieldValue('buyerName', value)

    if (value.trim().length > 0) {
      dispatch(searchBuyerProduct({ companyName: value }))
      setShowDropdown(true)
    } else {
      dispatch(clearProducts())
      setShowDropdown(false)
    }
  }

  const handleCompanySelect = (
    product: Product,
    setFieldValue: (field: string, value: any) => void
  ) => {
    console.log('handleCompanySelect function called with:', product)

    if (product && product.companyName) {
      setSearchTerm(product.companyName)
      
      // Update multiple form fields
      setFieldValue('buyerName', product.companyName)
      setFieldValue('buyerId', product?.userId || '')
      setFieldValue('buyerLocation', product?.location || '')
      setFieldValue('capacity', product?.capacity || '')
      setFieldValue('pricePerTonne', product?.price || '')

      // Update parent component's form data
      setFormData(prevFormData => ({
        ...prevFormData,
        buyerName: product.companyName,
        buyerId: product?.userId || '',
        buyerLocation: product?.location || '',
        capacity: product?.capacity || '',
        pricePerTonne: product?.price || '',
      }))

      setShowDropdown(false)
      console.log('Selection complete:', product.companyName)
    } else {
      console.error('Invalid product object received:', product)
    }
  }

  const selectedCompany = products.find(
    (item: Product) => item.companyName === searchTerm
  )

  const handleSupplierSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { value } = e.target
    setSupplierSearchTerm(value)
    setFieldValue('supplierName', value)

    if (value.trim().length > 0) {
      dispatch(searchSupplierProduct({ companyName: value }))
      setShowSupplierDropdown(true)
    } else {
      dispatch(clearSupplierProducts())
      setShowSupplierDropdown(false)
    }
  }

  const handleSupplierSelect = (
    product: Product,
    setFieldValue: (field: string, value: any) => void
  ) => {
    console.log('Supplier selected:', product)

    if (product && product.companyName) {
      setSupplierSearchTerm(product.companyName)

      // Update multiple form fields
      setFieldValue('supplierName', product.companyName)
      setFieldValue('supplierId', product?.userId || '')
      setFieldValue('supplierPrice', product?.price || '')
      setFieldValue('supplierLocation', product?.location || '')

      // Update parent component's form data
      setFormData(prevFormData => ({
        ...prevFormData,
        supplierName: product.companyName,
        supplierId: product?.userId || '',
        supplierPrice: product?.price || '',
        supplierLocation: product?.location || '',
      }))

      setShowSupplierDropdown(false)
    } else {
      console.error('Invalid supplier object:', product)
    }
  }

  const handleFormSubmit = (values: BuyerFormValues) => {
    console.log('Form submitted with values:', values)
    // Update parent component's form data
    setFormData(values as OrderFormData);
    // Add your form submission logic here
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false)
      setShowSupplierDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-white p-5 rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stroke pb-3">
        <h2 className="text-lg font-semibold">Create Order</h2>
        <h2 className="text-sm font-semibold text-violet">{modalTitle}</h2>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, handleChange: formikHandleChange, handleBlur }: FormikProps<BuyerFormValues>) => (
          <Form
            className="mt-4 flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Buyer Name with Search */}
            <div className="relative">
              <div className="flex items-center">
                <CustomInput
                  label="Buyer"
                  name="buyerName"
                  value={searchTerm}
                  type="text"
                  placeholder="Search company name"
                  onChange={(e) => handleSearchChange(e, setFieldValue)}
                  onFocus={() => setShowDropdown(searchTerm.trim().length > 3)}
                  icon={<FiSearch className="text-gray-400" />}
                  error={touched.buyerName && errors.buyerName}
                  required
                />
              </div>

              {showDropdown && (
                <div
                  id="search-dropdown"
                  className="absolute z-50 mt-1 w-full bg-white border border-stroke rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  {loading ? (
                    <div className="p-2 text-center text-gray-500">Loading...</div>
                  ) : products.length > 0 ? (
                    <ul>
                      {products.map(product => (
                        <div
                          key={product.id}
                          className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Item clicked:', product.companyName)
                            handleCompanySelect(product, setFieldValue)
                          }}
                        >
                          {product.companyName}
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-2 text-center text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <CustomInput
              label="Buyer Location"
              name="buyerLocation"
              value={values.buyerLocation}
              type="text"
              placeholder="Enter location"
              onChange={(e) => {
                formikHandleChange(e)
                setFormData(prev => ({ ...prev, buyerLocation: e.target.value }))
              }}
              onFocus={handleInputFocus}
              error={touched.buyerLocation && errors.buyerLocation}
              required
            />

            {/* Product & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="flex flex-col text-gray_light gap-1 text-sm">
                <label htmlFor="product">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  id="product"
                  name="product"
                  value={values.product}
                  onChange={(e) => {
                    formikHandleChange(e)
                    setFormData(prev => ({ ...prev, product: e.target.value }))
                  }}
                  onBlur={handleBlur}
                  onFocus={handleInputFocus}
                  className={`border py-[12px] px-2 rounded-lg focus:outline-none focus:ring-2 text-primary focus:ring-primary focus:border-transparent ${
                    touched.product && errors.product ? 'border-red-500' : 'border-stroke'
                  }`}
                >
                  <option value="">Select a product</option>
                  {selectedCompany?.product?.map((p: string, index: number) => (
                    <option key={index} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {touched.product && errors.product && (
                  <p className="text-red-500 text-sm mt-1">{errors.product}</p>
                )}
              </div>

              <CustomInput
                label="Capacity(MT)"
                name="capacity"
                value={values.capacity}
                type="number"
                placeholder="30"
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, capacity: e.target.value }))
                }}
                onFocus={handleInputFocus}
                error={touched.capacity && errors.capacity}
                required
              />

              <CustomInput
                label="Price/tonne(USD)"
                name="pricePerTonne"
                value={values.pricePerTonne}
                type="number"
                placeholder="20"
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, pricePerTonne: e.target.value }))
                }}
                onFocus={handleInputFocus}
                error={touched.pricePerTonne && errors.pricePerTonne}
                required
              />
            </div>

            {/* Shipping Type */}
            <div className="flex flex-col text-gray">
              <label htmlFor="shippingType">
                Shipping Type <span className="text-red-500">*</span>
              </label>
              <select
                id="shippingType"
                name="shippingType"
                value={values.shippingType}
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, shippingType: e.target.value }))
                }}
                onBlur={handleBlur}
                onFocus={handleInputFocus}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  touched.shippingType && errors.shippingType ? 'border-red-500' : 'border-stroke'
                }`}
              >
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="EXW">EXW</option>
              </select>
              {touched.shippingType && errors.shippingType && (
                <p className="text-red-500 text-sm mt-1">{errors.shippingType}</p>
              )}
            </div>

            {/* Payment Terms */}
            <div className="flex flex-col text-gray">
              <label htmlFor="paymentTerms">
                Payment Terms <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentTerms"
                name="paymentTerms"
                value={values.paymentTerms}
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))
                }}
                onBlur={handleBlur}
                onFocus={handleInputFocus}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  touched.paymentTerms && errors.paymentTerms ? 'border-red-500' : 'border-stroke'
                }`}
              >
                <option value="">Select payment terms</option>
                <option value="50">50% upfront</option>
                <option value="100">100% upfront</option>
              </select>
              {touched.paymentTerms && errors.paymentTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentTerms}</p>
              )}
            </div>

            {/* Supplier Search */}
            <div className="relative">
              <div className="flex items-center">
                <CustomInput
                  label="Supplier"
                  name="supplierName"
                  value={supplierSearchTerm}
                  type="text"
                  placeholder="Search company name"
                  onChange={(e) => handleSupplierSearchChange(e, setFieldValue)}
                  onFocus={() =>
                    setShowSupplierDropdown(supplierSearchTerm.trim().length > 3)
                  }
                  icon={<FiSearch className="text-gray-400" />}
                  error={touched.supplierName && errors.supplierName}
                  required
                />
              </div>

              {showSupplierDropdown && (
                <div
                  id="supplier-search-dropdown"
                  className="absolute z-50 mt-1 w-full bg-white border border-stroke rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  {loading ? (
                    <div className="p-2 text-center text-gray-500">Loading...</div>
                  ) : sellerProducts.length > 0 ? (
                    <ul>
                      {sellerProducts.map(product => (
                        <div
                          key={product.id}
                          className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSupplierSelect(product, setFieldValue)
                          }}
                        >
                          {product.companyName}
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-2 text-center text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <CustomInput
              label="Supplier Location"
              name="supplierLocation"
              value={values.supplierLocation}
              type="text"
              placeholder="supplier location.."
              onChange={(e) => {
                formikHandleChange(e)
                setFormData(prev => ({ ...prev, supplierLocation: e.target.value }))
              }}
              onFocus={handleInputFocus}
              error={touched.supplierLocation && errors.supplierLocation}
              required
            />

            {/* Cost Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <CustomInput
                label="Buyer's Price"
                name="buyerPrice"
                value={values.buyerPrice}
                type="number"
                placeholder="0"
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, buyerPrice: e.target.value }))
                }}
                onFocus={handleInputFocus}
                error={touched.buyerPrice && errors.buyerPrice}
                required
              />

              <CustomInput
                label="Supplier Price"
                name="supplierPrice"
                value={values.supplierPrice}
                type="number"
                placeholder="Enter Supplier Price"
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, supplierPrice: e.target.value }))
                }}
                onFocus={handleInputFocus}
                error={touched.supplierPrice && errors.supplierPrice}
                required
              />

              <CustomInput
                label="Shipping Cost"
                name="freightCost"
                value={values.freightCost}
                type="number"
                placeholder="Shipping Cost"
                onChange={(e) => {
                  formikHandleChange(e)
                  setFormData(prev => ({ ...prev, freightCost: e.target.value }))
                }}
                onFocus={handleInputFocus}
                error={touched.freightCost && errors.freightCost}
                required
              />
            </div>

            {/* Other Costs */}
            <CustomInput
              label="Other Costs (USD)"
              name="otherCosts"
              value={values.otherCosts}
              type="number"
              placeholder="Enter Other Costs"
              onChange={(e) => {
                formikHandleChange(e)
                setFormData(prev => ({ ...prev, otherCosts: e.target.value }))
              }}
              onFocus={handleInputFocus}
              error={touched.otherCosts && errors.otherCosts}
              required
            />

            <ProfitMarginDisplay profitMargin={profitMargin} />
            <SupplierSummary formData={formData} user={user} />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BuyerForm
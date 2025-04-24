/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import CustomInput from '@/components/CustomInput'
import ProfitMarginDisplay from './ProfitMarginDisplay'
import SupplierSummary from './SupplierSummary'
import { FormProps } from './types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Product } from '@/types/product'
import { FiSearch } from 'react-icons/fi'
import { clearProducts, selectProduct } from '@/redux/reducers/products'
import { searchProduct } from '@/api/products'

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
  const { products, loading } = useAppSelector(state => state.product)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('')
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false)

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)

    if (value.trim().length > 0) {
      dispatch(searchProduct({ companyName: value }))
      setShowDropdown(true)
    } else {
      dispatch(clearProducts())
      setShowDropdown(false)
    }
  }

  const handleCompanySelect = (product:Product) => {
    console.log('handleCompanySelect function called with:', product)

    if (product && product.companyName) {
      // Update the search term first
      setSearchTerm(product.companyName)

      // Then update the form data
      setFormData(prevFormData => ({
        ...prevFormData,
        buyerName: product.companyName,
        buyerId: product?.userId || '',
        location: product?.location || '',
        capacity: product?.capacity || '',
        pricePerTonne: product?.price || '',
      }))

      // Close dropdown last
      setShowDropdown(false)

      // This should indicate success
      console.log('Selection complete:', product.companyName)
    } else {
      console.error('Invalid product object received:', product)
    }
  }
  const selectedCompany = products.find(
    (item: Product) => item.companyName === formData.buyerName
  )
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSupplierSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    setSupplierSearchTerm(value)

    if (value.trim().length > 0) {
      dispatch(searchProduct({ companyName: value }))
      setShowSupplierDropdown(true)
    } else {
      dispatch(clearProducts())
      setShowSupplierDropdown(false)
    }
  }

  const handleSupplierSelect = (product: Product) => {
    console.log('Supplier selected:', product)

    if (product && product.companyName) {
      setSupplierSearchTerm(product.companyName)

      setFormData(prevFormData => ({
        ...prevFormData,
        supplierName: product.companyName,
        supplierId: product?.userId || '',
        supplierPrice: product?.price || '',
      }))

      setShowSupplierDropdown(false)
    } else {
      console.error('Invalid supplier object:', product)
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stroke pb-3">
        <h2 className="text-lg font-semibold">Create Order</h2>
        <h2 className="text-sm font-semibold text-violet">{modalTitle}</h2>
      </div>

      {/* Form */}
      <form
        className="mt-4 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
        onSubmit={e => e.preventDefault()}
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
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(searchTerm.trim().length > 3)}
              icon={<FiSearch className="text-gray-400" />}
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
                        handleCompanySelect(product)
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
          label="Location"
          name="capacity"
          value={formData.location}
          type="text"
          placeholder="Enter location"
          onChange={handleChange}
          onFocus={handleInputFocus}
        />

        {/* Product & Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex flex-col text-gray_light gap-1 text-sm">
            <label htmlFor="product">Product</label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleSelectChange}
              onFocus={handleInputFocus}
              className="border border-stroke py-[12px] px-2 rounded-lg focus:outline-none focus:ring-2 text-primary focus:ring-primary focus:border-transparent"
            >
              {selectedCompany?.product?.map((p: string, index: number) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <CustomInput
            label="Capacity (MT)"
            name="capacity"
            value={formData.capacity}
            type="number"
            placeholder="30?"
            onChange={handleChange}
            onFocus={handleInputFocus}
          />
          <CustomInput
            label="Price/tonne (USD)"
            name="pricePerTonne"
            value={formData.pricePerTonne}
            type="number"
            placeholder="20?"
            onChange={handleChange}
            onFocus={handleInputFocus}
          />
        </div>

        {/* Shipping Type */}
        <div className="flex flex-col text-gray">
          <label htmlFor="shippingType">Shipping Type</label>
          <select
            id="shippingType"
            name="shippingType"
            value={formData.shippingType}
            onChange={handleSelectChange}
            onFocus={handleInputFocus}
            className="border border-stroke p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="EXW">EXW</option>
          </select>
        </div>

        <div className="flex flex-col text-gray">
          <label htmlFor="shippingType">Payment Terms</label>
          <select
            id="paymentTerms"
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleSelectChange}
            onFocus={handleInputFocus}
            className="border border-stroke p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select payment terms</option>
            <option value="50">50% upfront</option>
            <option value="100">100% upfront</option>
          </select>
        </div>

        <div className="relative">
          <div className="flex items-center">
            <CustomInput
              label="Supplier"
              name="supplierName"
              value={supplierSearchTerm}
              type="text"
              placeholder="Search company name"
              onChange={handleSupplierSearchChange}
              onFocus={() =>
                setShowSupplierDropdown(supplierSearchTerm.trim().length > 3)
              }
              icon={<FiSearch className="text-gray-400" />}
            />
          </div>

          {showSupplierDropdown && (
            <div
              id="supplier-search-dropdown"
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
                        handleSupplierSelect(product)
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

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <CustomInput
            label="Buyer's Price"
            name="buyerPrice"
            value={formData.buyerPrice}
            type="number"
            placeholder="0"
            onChange={handleChange}
            onFocus={handleInputFocus}
          />
          <CustomInput
            label="Supplier Price"
            name="supplierPrice"
            value={formData.supplierPrice}
            type="number"
            placeholder="Enter Supplier Price"
            onChange={handleChange}
            onFocus={handleInputFocus}
          />
          <CustomInput
            label="Shipping Cost"
            name="freightCost"
            value={formData.freightCost}
            type="number"
            placeholder="Shipping Cost"
            onChange={handleChange}
            onFocus={handleInputFocus}
          />
        </div>

        Other Costs
        <CustomInput
          label="Other Costs (USD)"
          name="otherCosts"
          value={formData.otherCosts}
          type="number"
          placeholder="Enter Other Costs"
          onChange={handleChange}
          onFocus={handleInputFocus}
        />

      
        <ProfitMarginDisplay profitMargin={profitMargin} />


        <SupplierSummary formData={formData} user={user} />
      </form>
    </div>
  )
}

export default BuyerForm

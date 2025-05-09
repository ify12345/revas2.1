/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode } from 'react';
import { FaRegEnvelope, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { FaCircleChevronDown } from "react-icons/fa6";

// Define the props interface for the CustomInput component
interface CustomInputProps {
  label?: string; // Label for the input field
  type?: string; // Input type (e.g., "text", "password", "email", "select", "multiselect")
  name?: string;
  placeholder?: string; // Placeholder text (optional for select)
  value?: any; // Optional: Controlled input value
  onChange?: (e: any) => void; // Allow any event type for flexibility
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string; // Optional: Additional CSS classes
  required?: boolean; // Optional: Whether the input is required
  disabled?: boolean; // Optional: Whether the input is disabled
  options?: { label: string; value: string | number }[]; // Optional: Dropdown options
  icon?: ReactNode; // New prop to accept any React node as an icon
  // New props for multiselect
  multiSelectOptions?: { 
    category: string; 
    options: { label: string; value: string }[] 
  }[];
  selectedOptions?: string[];
  onMultiSelectChange?: (selectedOptions: string[]) => void;
}

// CustomInput component
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  className = '',
  required = false,
  disabled = false,
  options,
  icon,
  multiSelectOptions = [],
  selectedOptions = [],
  onMultiSelectChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine the input type based on whether it's a password and visibility is toggled
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Toggle option selection
  const toggleOption = (optionValue: string) => {
    if (!onMultiSelectChange) return;
    
    if (selectedOptions.includes(optionValue)) {
      // Remove option if already selected
      onMultiSelectChange(selectedOptions.filter(item => item !== optionValue));
    } else {
      // Add option if not selected
      onMultiSelectChange([...selectedOptions, optionValue]);
    }
  };

  // Remove a selected option
  const removeOption = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (!onMultiSelectChange) return;
    onMultiSelectChange(selectedOptions.filter(item => item !== optionValue));
  };

  // Find option label by value
  const getOptionLabel = (value: string): string => {
    for (const category of multiSelectOptions) {
      for (const option of category.options) {
        if (option.value === value) {
          return option.label;
        }
      }
    }
    return value;
  };

  if (type === 'multiselect') {
    return (
      <div className="w-full">
        {/* Label */}
        <label className="block text-sm font-medium text-gray_light mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>

        {/* Selected Options Display */}
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedOptions.map(optionValue => (
            <div 
              key={optionValue}
              className="bg-primary text-white px-2 py-1 text-sm rounded-md flex items-center"
            >
              {getOptionLabel(optionValue)}
              <button 
                type="button"
                onClick={(e) => removeOption(e, optionValue)}
                className="ml-2 text-white hover:text-red-200"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* Dropdown Trigger */}
        <div className="relative">
          <div 
            className="w-full border text-primary border-[#E2E8F0] py-[10px] px-2 rounded-md cursor-pointer flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-primaryLight">
              {selectedOptions.length > 0 ? 'Add more products' : placeholder || 'Select products'}
            </span>
            <FaCircleChevronDown color='#8f8f8f' />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-[#E2E8F0] rounded-md shadow-lg max-h-60 overflow-auto">
              {multiSelectOptions.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="px-3 py-2 bg-gray-100 font-medium">{category.category}</div>
                  <div>
                    {category.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                          selectedOptions.includes(option.value) ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => toggleOption(option.value)}
                      >
                        <div className="mr-2 w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                          {selectedOptions.includes(option.value) && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray_light mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {type === 'select' && options ? (
          // Render select dropdown if options are provided
          <select
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            disabled={disabled}
            className={`w-full border text-primary border-[#E2E8F0] py-[10px] px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          // Render input field for other types
          <>
            <input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              onFocus={onFocus}
              name={name}
              className={`w-full border text-primary border-[#E2E8F0] py-[10px] px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                icon ? 'pl-2' : ''
              } ${className}`}
            />
            {/* Custom Icon */}
            {icon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
          </>
        )}

        {/* Email Icon */}
        {type === 'email' && !icon && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <FaRegEnvelope className="text-gray_light" />
          </div>
        )}

        {/* Eye Icon for Password */}
        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray_light" />
            ) : (
              <FaEye className="text-gray_light" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
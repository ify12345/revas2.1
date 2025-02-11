/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaRegEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons

// Define the props interface for the CustomInput component
interface CustomInputProps {
  label: string; // Label for the input field
  type: string; // Input type (e.g., "text", "password", "email")
  placeholder: string; // Placeholder text
  value?: any; // Optional: Controlled input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional: Change handler
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional: Change handler
  className?: string; // Optional: Additional CSS classes
  required?: boolean; // Optional: Whether the input is required
  disabled?: boolean; // Optional: Whether the input is disabled
}

// CustomInput component
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  className = '',
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Determine the input type based on whether it's a password and visibility is toggled
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray_light mb-1">
        {label}
        {required && <span className="text-red-500"> </span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Input Field */}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={onFocus}
          className={`w-full border text-gray_light border-[#E2E8F0] py-[10px] px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            type === 'email' ? 'pl-2' : '' // Add padding for email icon
          } ${className}`}
        />

        {/* Email Icon */}
        {type === 'email' && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <FaRegEnvelope className="text-stroke" />
          </div>
        )}

        {/* Eye Icon for Password */}
        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-stroke" />
            ) : (
              <FaEye className="text-stroke" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
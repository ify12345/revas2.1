// CreateOrderForm.tsx
import React from 'react';
import Modal from '../Modal';


interface CreateOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrderForm = ({ isOpen, onClose }: CreateOrderFormProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Order">
      <form className="mx-4 mt-[22px]  px-5 py-[22px] rounded-t-[12px] border-stroke border-t border-r border-b-0 border-l flex justify-between flex-col h-full">
        <div className="h-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#757575]">
              Company Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-stroke rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#757575]">
              Product
            </label>
            <select className="w-full p-2 border border-stroke rounded-md">
              <option value="">Select Product</option>
              <option value="product1">Product 1</option>
              <option value="product2">Product 2</option>
              <option value="product3">Product 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#757575]">
              Capacity (MT)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-stroke rounded-md"
              placeholder="Enter capacity in MT"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#757575]">
              Price/Tonne (USD)
            </label>
            <input
              type="number"
              className="w-full p-2 border border-stroke rounded-md"
              placeholder="Enter price in USD"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#757575]">
              Location
            </label>
            <select className="w-full p-2 border border-stroke rounded-md">
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>
        </div>
      </form>
        <div className="flex justify-end px-5 gap-3 border-t border-stroke py-3">
          <button
            type="submit"
            className="bg-[#fff] text-[#000] border border-stroke py-[10px] px-[12px] rounded-[8px]"
          >
            Save as draft
          </button>
          <button
            type="submit"
            className="bg-[#050505] text-[#ffff] py-[10px] px-[12px] rounded-[8px]"
          >
            Create
          </button>
        </div>
    </Modal>
  );
};

export default CreateOrderForm;
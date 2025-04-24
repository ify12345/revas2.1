/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import buyerImg from '@/assets/images/buyer.png';
import buyerEllipse from '@/assets/images/ellipse.png';
import { OrderFormData } from './types';

interface OrderSummaryViewProps {
  formData: OrderFormData;
  user: any;
  save: () => void;
}

const OrderSummaryView: React.FC<OrderSummaryViewProps> = ({ formData, user,save }) => (
  <div className="rounded-lg m-1 gap-4 flex-col flex" onClick={(e) => e.stopPropagation()}>
    <div className="relative">
      <img src={buyerImg} className="h-[15%] w-full" alt="" />
      <img
        src={buyerEllipse}
        className="rounded-full border-[#ffff] top-16 size-[120px] left border-3 absolute z-50"
        alt=""
      />
      <button 
        className="border border-stroke shadow-xl hover:scale-95 text-primary px-3 py-2 flex ml-auto rounded-lg mt-2"
        onClick={save}
      >
        Save as draft
      </button>
    </div>
    <div className="border-b-[0.4px] border-stroke py-1 flex flex-col text-gray px-[14px] gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <p className="text-gray font-bold">{formData.buyerName || 'Invalid company name'}</p>
        <p className="font-light text-sm">
         {formData.location || 'No location provided'}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="border-r border-stroke pr-3 flex flex-col gap-1">
          <p className="text-sm font-light">Client Type</p>
          <p className="text-base font-medium capitalize">{user.user.role}</p>
        </div>
        <div className="border-r border-stroke px-3 flex flex-col gap-1">
          <p className="text-sm font-light">Total Transaction</p>
          <p className="text-base font-medium">${formData.buyerPrice || 'select price'}</p>
        </div>
        <div className="flex flex-col gap-1 pl-3">
          <p className="text-sm font-light">Monthly Capacity</p>
          <p className="text-base font-medium">{formData.capacity || 'select capacity in'} MT</p>
        </div>
      </div>
    </div>
    <div className="px-[14px] flex flex-col gap-4">
      {/* Display fields, not editable */}
      <div className="flex flex-col text-gray gap-1">
        <label className="text-sm font-medium text-gray_light">Company Name</label>
        <p className="border border-stroke p-2 rounded-lg bg-gray-50">{formData.buyerName || 'Not provided'}</p>
      </div>

      <div className="flex flex-col text-gray gap-1">
        <label className="text-sm font-medium text-gray_light">Email</label>
        <p className="border border-stroke p-2 rounded-lg bg-gray-50">{user.user.email}</p>
      </div>

      <div className="flex flex-col text-gray gap-1">
        <label className="text-sm font-medium text-gray_light">Product</label>
        <p className="border border-stroke p-2 rounded-lg bg-gray-50">{formData.product || 'Not selected'}</p>
      </div>

      <div className="flex flex-col text-gray gap-1">
        <label className="text-sm font-medium text-gray_light">Capacity (MT)</label>
        <p className="border border-stroke p-2 rounded-lg bg-gray-50">{formData.capacity || '0'}</p>
      </div>

      <div className="flex flex-col text-gray gap-1">
        <label className="text-sm font-medium text-gray_light">Location</label>
        <p className="border border-stroke p-2 rounded-lg bg-gray-50">{formData.location || 'Not selected'}</p>
      </div>
    </div>
  </div>
);

export default OrderSummaryView;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { OrderFormData } from './types';

interface SupplierSummaryProps {
  formData: OrderFormData;
  user: any;
}

const SupplierSummary: React.FC<SupplierSummaryProps> = ({ formData, user }) => (
  <div className="border border-stroke bg-[#efefef] px-4 py-4 rounded-lg flex flex-col gap-1">
    <div className="flex justify-between items-center text-gray_light text-sm w-full">
      <p className="text-primary font-bold">
        {formData.supplierName || user.user.firstName}
      </p>
      <button>x</button>
    </div>
    <p>
      Price:
      <span className="text-success font-bold text-md">
        ${formData.supplierPrice}
      </span>
    </p>
    <div className="flex items-center justify-between w-full text-gray_light text-sm">
      <p>
        Capacity:{' '}
        <span className="text-primary">{formData.capacity || '100'}</span>
      </p>
      <p>
        Account Manager:{' '}
        <span className="text-primary">{user.user.firstName}</span>
      </p>
    </div>
  </div>
);

export default SupplierSummary;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface OrderFormData {
  buyerName: string;
  buyerId?: string;  // Added to store the user ID of the selected company
  supplierId?: string;  // Added to store the user ID of the selected company
  email: string | undefined;
  buyerLocation: string;
  supplierLocation: string;
  product: string;
  paymentTerms:string;
  capacity: number | string;
  pricePerTonne: number | string;
  shippingType: string;
  supplierName: string;
  buyerPrice: number | string;
  supplierPrice: number | string;
  freightCost: number | string;
  otherCosts: number | string;
  negotiatePrice: boolean;
  priceRange: number | string;
  savedStatus: string;
}

export interface FormProps {
  formData: OrderFormData;
  setFormData: React.Dispatch<React.SetStateAction<OrderFormData>>;  // Added to update form data directly from child
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  profitMargin: number | null;
  modalTitle: React.ReactNode;
  user: any;
}
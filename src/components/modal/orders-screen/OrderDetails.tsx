import React, { useState } from 'react';
import Modal from '../Modal';

import { editOrder, generateOrder } from '@/api/order';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import CustomInput from '@/components/CustomInput';
import { Order } from '@/types/apiResponse';
import { showToast } from '@/components/Toast';
import Success from '@/components/svg/success';


interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  person: Order;
}

const OrderDetails = ({ isOpen, onClose, person }: OrderDetailsProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    supplierName: person.supplierName,
    product: person.product,
    pricePerTonne: person.pricePerTonne,
    location: person.location,
    status: person.status,
    capacity: person.capacity,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle PDF generation via API
  const handleGenerateDocument = () => {
    setDocumentLoading(true);
    
    const payload = {
      id: person.id
    };
    
    dispatch(generateOrder(payload))
      .unwrap()
      .then((response) => {
        setDocumentLoading(false);
        
        // Show success message
        showToast({ type: 'success', msg: response.message });
        
        // If the API returns a URL to preview the document, open it
        if (response?.data?.docUrl) {
          window.open(response.data.docUrl, '_blank');
        }
      })
      .catch((err) => {
        setDocumentLoading(false);
        
        // Show error message
        const errorMessage = err?.msg || err?.response?.data?.detail || 'An error occurred';
        showToast({ 
          type: 'error', 
          msg: errorMessage 
        });
        
        console.error('Error generating document:', err);
      });
  };

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      id: person.id,
      ...formData,
    };
    
    dispatch(editOrder(payload))
      .unwrap()
      .then(response => {
        setLoading(false);
        onClose();
        console.log('Success:', response);
        showToast({ type: 'success', msg: response.message });
      })
      .catch(err => {
        setLoading(false);
        onClose();
        const errorMessage = err?.msg?.message || err?.response?.data?.detail || 'An error occurred';
        console.error('Error:', err);
        showToast({ type: 'error', msg: errorMessage });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order request">
      <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
        {person.status === 'matched' && (
          <div className="flex flex-col justify-center items-center gap-2 mx-auto text-sm">
            <Success />
            <p className="text-2xl font-medium text-primary">Congratulations</p>
            <p>Your order has been matched</p>
          </div>
        )}
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Company Name"
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            disabled={person.status === 'matched'}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Product"
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            disabled={person.status === 'matched'}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Price/Tonne (USD)"
            type="number"
            name="pricePerTonne"
            value={formData.pricePerTonne}
            onChange={handleChange}
            disabled={person.status === 'matched'}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={person.status === 'matched'}
          />
        </div>
        <div className="text-sm flex flex-col w-full justify-between">
          <CustomInput
            label="Capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            disabled={person.status === 'matched'}
          />
        </div>

        {person.status !== 'matched' && (
          <div className="text-sm flex flex-col w-full justify-between">
            <CustomInput
              label="Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex justify-end pl-5 gap-3 border-t border-stroke py-3 items-end">
          <button
            onClick={onClose}
            className="bg-[#fff] text-[#535353] px-4 py-2 border border-stroke rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={
              person.status === 'matched'
                ? handleGenerateDocument
                : handleSubmit
            }
            disabled={loading || documentLoading}
            className="bg-[#000] text-[#FFF] px-4 py-2 rounded-lg"
          >
            {loading || documentLoading ? 'Processing...' : 
              person.status === 'matched'
                ? `Generate ${user?.role === 'buyer' ? 'SO' : 'PO'}`
                : 'Edit Request'
            }
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetails;
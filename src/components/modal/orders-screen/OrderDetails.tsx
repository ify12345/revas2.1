// OrderDetails.tsx
import { Person } from '@/types/page';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '../Modal';


interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person;
}

const OrderDetails = ({ isOpen, onClose, person }: OrderDetailsProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={person.companyName}>
      <div className="my-6 mx-3 p-5 border border-stroke rounded-[12px] text-[#757575] flex flex-col gap-[18px]">
        <p className="text-sm flex w-full justify-between">
          Capacity
          <span>{person.companyName}</span>
        </p>
        <p className="text-sm flex w-full justify-between">
          <span>Product</span> {person.product}
        </p>
        <p className="text-sm flex w-full justify-between">
          <span>Price/Tonne (USD):</span> {person.price}
        </p>
        <p className="text-sm flex w-full justify-between">
          <span>Location:</span> {person.location}
        </p>
        <p className="text-sm flex w-full justify-between">
          <span>Status:</span> {person.status}
        </p>

        <div className="bg-[#F7F7F7] p-[12px]">
          <div className="flex w-full justify-between">
            <div className="text-sm font-bold text-primary">
              Franko Recycling
            </div>
            <IoMdClose color="gray" />
          </div>
          <p className="font-bold text-success">${person.price}</p>
          <div className="flex w-full justify-between">
            <div className="text-sm font-light text-[#8F8F8F]">
              capacity{' '}
              <span className="font-bold text-primary">
                {person.price}
              </span>
            </div>
            <div className="text-sm font-light text-[#8F8F8F]">
              Account manager:{' '}
              <span className="font-bold text-primary">Lolade</span>
            </div>
          </div>
        </div>
        <select className="w-full p-2 border border-stroke rounded-md">
          <option value="">Select Buyer</option>
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
          <option value="location3">Location 3</option>
        </select>
        <button
          type="submit"
          className="bg-[#050505] text-[#ffff] py-[10px] px-[12px] rounded-[8px] w-full"
        >
          Send Request
        </button>
      </div>
    </Modal>
  );
};

export default OrderDetails;
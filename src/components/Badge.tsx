import * as React from 'react';
import { useState } from 'react';
import { FaClock } from "react-icons/fa";
import PiAirlineSeat from './svg/PiAirlineSeat';
import { FcCancel } from "react-icons/fc";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { editStatus, getOrder } from '@/api/order';
import { showToast } from '@/components/Toast';

type StatusType = 'matched' | 'not_matched' | 'pending_approval' | 'document_phase';

interface BadgeProps {
  status: StatusType;
  orderId?: string;
  // disableEditing is now optional and only used to override the default behavior
  disableEditing?: boolean;
}

const statusConfig: Record<StatusType, { text: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  matched: {
    text: "Matched",
    color: "#32ADE6",
    bgColor: "#F8FAFC",
    icon: <PiAirlineSeat />,
  },
  not_matched: {
    text: "Not Matched",
    color: "#ff0000",
    bgColor: "#E7F6EC",
    icon: <FcCancel />
  },
  pending_approval: {
    text: "Pending",
    color: "#D97706",
    bgColor: "#FFFBEB",
    icon: <FaClock color="#D97706" />,
  },
  document_phase: {
    text: "Documentation",
    color: "#B58830",
    bgColor: "#FFFBEB",
    icon: <IoDocumentTextOutline color="#B58830" />,
  },
};

export default function Badge({ status, orderId, disableEditing }: BadgeProps) {
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Get user from Redux state
  const user = useAppSelector(state => state.auth.user);
  const clientType = user?.clientType;
  
  // Check if editing should be disabled based on client type
  // Only Supplier and Buyer client types can edit status
  const isEditingDisabled = disableEditing !== undefined 
    ? disableEditing 
    : (clientType);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const config = statusConfig[currentStatus];
  
  if (!config) {
    console.log(`Invalid status passed to Badge: ${status}`);
    return null;
  }
  
  const { text, color, bgColor, icon } = config;
  
  const handleToggleDropdown = () => {
    if (isEditingDisabled) {
      // Don't open dropdown if editing is disabled
      return;
    }
    setIsOpen(!isOpen);
  };
  
  const handleStatusChange = (newStatus: StatusType) => {
    if (isEditingDisabled) {
      return; // Prevent status change if editing is disabled
    }
    console.log(newStatus)
    setLoading(true);
    
    if (newStatus === currentStatus) {
      setIsOpen(false);
      setLoading(false);
      return;
    }
    
    const payload = {
      id: orderId,
      status: newStatus
    };
    console.log(payload)
    dispatch(editStatus(payload))
      .unwrap()
      .then(response => {
        setCurrentStatus(newStatus);
        setLoading(false);
        console.log('Success:', response);
        showToast({ type: 'success', msg: response.message || 'Status updated' });
        dispatch(getOrder({}))
      })
      .catch(err => {
        setLoading(false);
        const errorMessage = err?.msg?.message || err?.msg;
        console.error('Error:', err);
        showToast({ type: 'error', msg: errorMessage });
      })
      .finally(() => {
        setIsOpen(false);
      });
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`flex gap-2 items-center justify-between py-1 px-3 rounded-xl w-fit ${isEditingDisabled ? 'opacity-75' : 'cursor-pointer'}`}
        style={{ backgroundColor: bgColor, color }}
        onClick={handleToggleDropdown}
      >
        <div className="flex gap-2 items-center">
          {icon}
          <p>{text}</p>
        </div>
        {!isEditingDisabled && (
          <FiChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </div>
      
      {isOpen && !isEditingDisabled && (
        <div className="absolute -top-24 z-50 mt-1 w-40 rounded-md shadow-lg bg-white">
          <div className="py-1">
            {Object.entries(statusConfig).map(([key, value]) => (
              <div
                key={key}
                className={`flex items-center px-4 py-2 hover:scale-95 transition-all duration-300 text-sm hover:bg-gray-100 cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleStatusChange(key as StatusType)}
              >
                <span className="mr-2">{value.icon}</span>
                <span style={{ color: value.color }}>{value.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
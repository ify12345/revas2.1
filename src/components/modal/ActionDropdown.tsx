// ActionDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import OfficeSvg from '../svg/Office';
import TrashSvg from '../svg/Trash';

interface ActionDropdownProps {
  onGoTo: () => void;
  onDelete: () => void;
}

const ActionDropdown = ({ onGoTo, onDelete }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <HiOutlineDotsHorizontal className="h-5 w-5 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="fixed right-20 mt-1 w-36 bg-[#fff] rounded-lg shadow-lg border border-stroke py-1 z-50 flex flex-col px-3">
          <button
            onClick={handleAction(onGoTo)}
            className="w-full px-1 py-2 text-sm text-gray text-left flex items-center gap-2 hover:scale-95 transition-all duration-200"
          >
            <OfficeSvg/>
            Go to
          </button>
          <button
            onClick={handleAction(onDelete)}
            className="w-full px-1 py-2 text-sm text-red-600 hover:bg-gray-100 text-left border-t hover:scale-95 transition-all duration-200 border-stroke flex items-center gap-2 text-danger"
          >
            <TrashSvg/>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  styles?: string; // Custom styles passed as prop
}

type Props = {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, styles }, {children} : Props) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ${styles}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

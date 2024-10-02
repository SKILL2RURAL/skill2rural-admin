// components/ReusableModal.tsx
import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { cancel } from '@/assets/icons';
import Image from 'next/image';

interface ReusableModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  styles?: React.CSSProperties; // Optional custom styles for the modal
  editCourse?: boolean;
}



const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose,children, styles, editCourse }) => {
  
  

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {editCourse ? 
        <Box>
          {children}
        </Box> :
        <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 679,
          maxHeight: '95vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          overflowY: 'auto',
          ...styles, // Accept custom styles passed from props
        }}
      >
        <div className='absolute right-2 top-2' onClick={onClose}><Image src={cancel} alt="cancel button"/></div>
        {children}
      </Box>
      }
    </Modal>
  );
};

export default ReusableModal;

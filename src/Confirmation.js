import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FiAlertTriangle } from "react-icons/fi";
function ConfirmationModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle className='text-warning' ><FiAlertTriangle/> warning...</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to discard the changes?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;

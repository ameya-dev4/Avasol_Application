import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FiAlertTriangle } from "react-icons/fi";
function ErrorHandlingPage({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle className='text-Danger' ><FiAlertTriangle/> Network Error...</DialogTitle>
      <DialogContent>
        <DialogContentText>Error occured..! Refresh site Again..</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorHandlingPage;

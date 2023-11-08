import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FiAlertTriangle,FiTrash2 } from "react-icons/fi";
function DeleteConfirm({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle className='text-danger' ><FiTrash2/> Deleting...</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete battery...! </DialogContentText>
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

export default DeleteConfirm;

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ConfirmationModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Confirm Action</DialogTitle>
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

import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function ConfirmationDialog({ open, onClose, prompt, onConfirm, confirmButtonText }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          {typeof prompt === 'string' ? (
            <DialogContentText>{prompt}</DialogContentText>
          ) : (
            <DialogContent>{prompt}</DialogContent>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus>
            {confirmButtonText || "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;

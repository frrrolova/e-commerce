import { Dialog, DialogActions, IconButton } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface ConfirmModalProps {
  onClose: () => void;
  open: boolean;
  children: JSX.Element;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ onClose, open, onConfirm, onCancel, children }: ConfirmModalProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      {children}
      <DialogActions>
        <IconButton color="error" size="small" onClick={onConfirm}>
          <CheckCircleOutlineOutlinedIcon />
        </IconButton>
        <IconButton size="small" onClick={onCancel}>
          <CancelOutlinedIcon />
        </IconButton>{' '}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;

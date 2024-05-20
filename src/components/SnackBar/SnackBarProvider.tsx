import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, useState } from 'react';

interface SnackBarContextValue {
  open: (message: string, reason: AlertColor) => void;
  close: () => void;
}

export const SnackBarContext = createContext<SnackBarContextValue>({
  open: () => {},
  close: () => {},
});

function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState<string>();
  const [severity, setSeverity] = useState<AlertColor>();

  const open = (message: string, reason: AlertColor) => {
    setIsOpen(true);
    setMsg(message);
    setSeverity(reason);
  };
  const close = () => setIsOpen(false);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ open, close }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
}

export default SnackBarProvider;

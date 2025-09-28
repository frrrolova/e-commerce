import { Button, Paper } from '@mui/material';

interface BottomBarProps {
  onClick: () => void;
  children: JSX.Element;
  isMatchMedia: boolean;
}

function BottomBar({ onClick, isMatchMedia, children }: BottomBarProps) {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
      }}
      elevation={7}
      onClick={onClick}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ display: isMatchMedia ? 'none' : 'inline-flex', alignItems: 'center', gap: 2 }}
      >
        {children}
      </Button>
    </Paper>
  );
}

export default BottomBar;

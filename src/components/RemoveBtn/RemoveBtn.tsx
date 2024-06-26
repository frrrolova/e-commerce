import { IconButton, SxProps, Tooltip, useMediaQuery } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import theme from '@/themes/theme';

interface RemoveBtnProps {
  onClick: () => void;
  sx?: SxProps;
}

function RemoveBtn({ onClick, sx }: RemoveBtnProps) {
  const matchesExtraSmallScreen = useMediaQuery('(max-width:450px)');

  return (
    <Tooltip title="Delete">
      <IconButton
        size={matchesExtraSmallScreen ? 'small' : 'medium'}
        sx={{
          color: theme.palette.grey[500],
          opacity: 0.8,
          ...sx,
        }}
        onClick={onClick}
      >
        <DeleteOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}

export default RemoveBtn;

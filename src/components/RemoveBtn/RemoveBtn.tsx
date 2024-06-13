import { IconButton, SxProps, useMediaQuery } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import theme from '@/themes/theme';

interface RemoveBtnProps {
  onClick: () => void;
  sx?: SxProps;
}

function RemoveBtn({ onClick, sx }: RemoveBtnProps) {
  const matchesExtraSmallScreen = useMediaQuery('(max-width:450px)');

  return (
    <IconButton
      size={matchesExtraSmallScreen ? 'small' : 'medium'}
      sx={{
        // marginX: 1.5,
        color: theme.palette.grey[500],
        opacity: 0.8,
        // alignSelf: { xs: 'flex-start', sm: 'center' },
        ...sx,
      }}
      onClick={onClick}
    >
      <DeleteOutlinedIcon fontSize="inherit" />
    </IconButton>
  );
}

export default RemoveBtn;

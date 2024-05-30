import { IconButton, Typography, Box } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import theme from '@/themes/theme';
import { useState } from 'react';

interface EditableFieldProps {
  placeholder?: string;
  label: string;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  isSaveDisabled: boolean;
  children: JSX.Element;
}

function EditableField({
  label,
  isSaveDisabled,
  onSaveClick,
  onCancelClick,
  onEditClick,
  children,
}: EditableFieldProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Box
      display={'flex'}
      gap={'12px'}
      alignItems={'baseline'}
      sx={{
        mb: 1,
        minHeight: '35px',
      }}
    >
      <Typography
        sx={{
          textWrap: 'nowrap',
          minWidth: '100px',
          textAlign: 'end',
        }}
      >{`${label}:`}</Typography>
      <Box
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Box>

      <Box sx={{ minWidth: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!isEditMode && (
          <IconButton
            sx={{
              border: '1px solid',
              borderRadius: '7px',
              padding: '3px',
              borderColor: theme.palette.primary.light,
              fontSize: 'small',
            }}
            onClick={() => {
              setIsEditMode(!isEditMode);
              onEditClick();
            }}
          >
            <ModeEditOutlineIcon />
          </IconButton>
        )}
        {isEditMode && (
          <Box
            sx={{
              display: 'flex',
              gap: '3px',
            }}
          >
            <IconButton
              disabled={isSaveDisabled}
              sx={{
                border: '1px solid',
                borderRadius: '7px',
                padding: '3px',
                borderColor: theme.palette.primary.light,
                fontSize: 'small',
              }}
              onClick={() => {
                setIsEditMode(false);
                onSaveClick();
              }}
            >
              <SaveOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{
                border: '1px solid',
                borderRadius: '7px',
                padding: '3px',
                borderColor: theme.palette.primary.light,
                fontSize: 'small',
              }}
              onClick={() => {
                setIsEditMode(false);
                onCancelClick();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EditableField;

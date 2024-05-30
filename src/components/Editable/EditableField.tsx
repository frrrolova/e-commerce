import { IconButton, Typography, Box } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
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
            color="primary"
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
              color="primary"
              onClick={() => {
                setIsEditMode(false);
                onSaveClick();
              }}
            >
              <SaveOutlinedIcon />
            </IconButton>
            <IconButton
              color="primary"
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

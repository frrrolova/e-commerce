import { IconButton, Typography, Box } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useState } from 'react';

export interface EditableFieldProps {
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
          mr: '12px',
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
            data-testid="edit-btn"
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
            data-testid="edit-mode-btns"
            sx={{
              display: 'flex',
              gap: '3px',
            }}
          >
            <IconButton
              disabled={isSaveDisabled}
              color="primary"
              data-testid="edit-save"
              onClick={() => {
                setIsEditMode(false);
                onSaveClick();
              }}
            >
              <SaveOutlinedIcon />
            </IconButton>
            <IconButton
              color="primary"
              data-testid="edit-cancel"
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

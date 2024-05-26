import { IconButton, TextField, InputProps, SxProps, Typography, Box, FormHelperText } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import theme from '@/themes/theme';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface EditableInputProps {
  name: string;
  value: string;
  placeholder?: string;
  label: string;
  error?: boolean;
  sx?: SxProps;
  InputProps?: Partial<InputProps>;
  schema: Yup.StringSchema | Yup.DateSchema;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onSaveClick: (value: string) => void;
}

function EditableInput({ name, value, schema, label, onSaveClick, ...muiInputProps }: EditableInputProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      [name]: value,
    },
    // validateOnMount: false,
    validationSchema: Yup.object().shape({
      [name]: schema,
    }),
    onSubmit: (value) => {
      console.log(value);
    },
  });

  return (
    <Box
      display={'flex'}
      gap={'5px'}
      alignItems={'center'}
      sx={{
        mb: 1,
      }}
    >
      <Typography
        sx={{
          textWrap: 'nowrap',
        }}
      >{`${label}:`}</Typography>
      {!isEditMode && (
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {formik.values[name]}
        </Typography>
      )}
      {isEditMode && (
        <Box
          sx={{
            flex: 1,
          }}
        >
          <TextField
            {...muiInputProps}
            name={name}
            variant="standard"
            fullWidth
            value={formik.values[name]}
            aria-describedby="my-helper-text"
            id={`${name}-input`}
            sx={{
              '& input': {
                textAlign: 'center',
              },
            }}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldTouched(name).then(() => {
                formik.validateField(name);
              });
            }}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
          />
          {Boolean(formik.errors[name]) && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
        </Box>
      )}
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
          }}
        >
          <ModeEditOutlineIcon />
        </IconButton>
      )}
      {isEditMode && (
        <Box>
          <IconButton
            disabled={!formik.isValid}
            sx={{
              border: '1px solid',
              borderRadius: '7px',
              padding: '3px',
              borderColor: theme.palette.primary.light,
              fontSize: 'small',
            }}
            onClick={() => {
              setIsEditMode(false);
              onSaveClick(formik.values[name]);
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
              formik.setFieldValue(name, value).then(() => {
                setIsEditMode(false);
              });
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default EditableInput;

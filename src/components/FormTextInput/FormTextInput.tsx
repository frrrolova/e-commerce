import {
  FilledInputProps,
  FormControl,
  FormHelperText,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
} from '@mui/material';

interface FormTextInputProps {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: boolean;
  errorMsg?: string;
  sx?: SxProps;
  type?: string;
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>;
  disabled?: boolean;
}

function FormTextInput({ errorMsg, disabled, ...muiInputProps }: FormTextInputProps) {
  return (
    <FormControl fullWidth margin="dense">
      <TextField
        {...muiInputProps}
        disabled={disabled}
        size="small"
        aria-describedby="my-helper-text"
        id={`${muiInputProps.name}-input`}
        sx={{
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #262e22e6 inset',
          },
        }}
      />
      {muiInputProps.error && Boolean(errorMsg) && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}

export default FormTextInput;

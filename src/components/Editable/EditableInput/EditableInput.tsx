import { TextField, FormHelperText, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditableField from '../EditableField';
import { useState } from 'react';

export interface EditableInputProps {
  name: string;
  initialValue: string;
  placeholder: string;
  label: string;
  schema: Yup.AnySchema;
  onSave: (value: string) => void;
}

function EditableInput({ name, initialValue, placeholder, label, schema, onSave }: EditableInputProps) {
  const formik = useFormik({
    initialValues: {
      [name]: initialValue,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      [name]: schema,
    }),
    onSubmit: () => {
      // do nothing
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <EditableField
      placeholder={placeholder}
      data-testid={`${name}-field`}
      label={label}
      isSaveDisabled={!formik.isValid}
      onEditClick={() => {
        setIsEditMode(true);
      }}
      onCancelClick={() => {
        formik.setFieldValue(name, initialValue);
        setIsEditMode(false);
      }}
      onSaveClick={() => {
        onSave(formik.values[name]);
        setIsEditMode(false);
      }}
    >
      <>
        <TextField
          InputProps={{ readOnly: !isEditMode, disableUnderline: !isEditMode, autoComplete: 'off' }}
          name={name}
          variant="standard"
          fullWidth
          value={formik.values[name]}
          title={matches ? '' : formik.values[name]}
          aria-describedby="my-helper-text"
          id={`${name}-input`}
          data-testid={`${name}-input`}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched(name).then(() => {
              formik.validateField(name);
            });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          sx={{
            '& input': { padding: 0, textOverflow: 'ellipsis' },
          }}
        />
        {Boolean(formik.errors[name]) && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
      </>
    </EditableField>
  );
}

export default EditableInput;

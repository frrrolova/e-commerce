import { TextField, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditableField from '../Editable/EditableField';
import { useState } from 'react';

interface EditableInputProps {
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
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditableField
      placeholder={placeholder}
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
          InputProps={{ readOnly: !isEditMode, disableUnderline: !isEditMode }}
          name={name}
          variant="standard"
          fullWidth
          value={formik.values[name]}
          aria-describedby="my-helper-text"
          id={`${name}-input`}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched(name).then(() => {
              formik.validateField(name);
            });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          sx={{
            '& input': { padding: 0 },
          }}
        />
        {Boolean(formik.errors[name]) && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
      </>
    </EditableField>
  );
}

export default EditableInput;

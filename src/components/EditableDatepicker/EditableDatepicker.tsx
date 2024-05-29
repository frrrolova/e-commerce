import { FormHelperText, InputProps, SxProps } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EditableField from '../Editable/EditableField';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers';

interface EditableDatePickerProps {
  name: string;
  initialValue: string;
  label: string;
  placeholder?: string;
  error?: boolean;
  sx?: SxProps;
  InputProps?: Partial<InputProps>;
  schema: Yup.StringSchema | Yup.DateSchema;
  onSave: (value: string) => void;
}

function EditableDatePicker({ name, initialValue, schema, label, onSave }: EditableDatePickerProps) {
  const formik = useFormik({
    initialValues: {
      [name]: initialValue,
    },
    // validateOnMount: false,
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
        <DateField
          InputProps={{ disableUnderline: !isEditMode }}
          readOnly={!isEditMode}
          value={dayjs(formik.values[name])}
          variant="standard"
          fullWidth
          id={`${name}-input`}
          format="DD.MM.YYYY"
          name={name}
          onChange={(val): void => {
            formik.setFieldValue(name, val?.toDate());
            formik.setFieldTouched(name).then(() => {
              formik.validateField(name);
            });
          }}
          onBlur={formik.handleBlur}
          slotProps={{
            textField: {
              size: 'small',
              error: Boolean(formik.touched.dateOfBirth) && Boolean(formik.errors.dateOfBirth),
              onBlur: formik.handleBlur,
            },
          }}
        />
        {Boolean(formik.errors[name]) && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
      </>
    </EditableField>
  );
}

export default EditableDatePicker;

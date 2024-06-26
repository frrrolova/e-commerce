import { passwordSchema } from '@/core/commonValidation';
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FormTextInput from '../FormTextInput/FormTextInput';
import { passwordFormConfig } from './constants';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '@/themes/theme';

interface ChangePasswordFormProps {
  onClose: () => void;
  onSubmit: (currentPass: string, newPass: string) => void;
}

function ChangePasswordForm({ onClose, onSubmit }: ChangePasswordFormProps) {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      currentPassword: passwordSchema,
      newPassword: passwordSchema,
    }),
    onSubmit: () => {
      onSubmit(formik.values.currentPassword, formik.values.newPassword);
      onClose();
    },
  });

  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const handleClickShowCurrPassword = () => setShowCurrPassword((show) => !show);
  const handleMouseDownCurrPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component={'form'}
      sx={{ maxWidth: 500 }}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <DialogTitle sx={{ color: theme.palette.primary.light }}>Change Password</DialogTitle>
      <DialogContent>
        <FormTextInput
          name={passwordFormConfig.currentPassword.name}
          value={formik.values.currentPassword}
          placeholder={passwordFormConfig.currentPassword.placeholder}
          label={passwordFormConfig.currentPassword.label}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched(passwordFormConfig.currentPassword.name).then(() => {
              formik.validateField(passwordFormConfig.currentPassword.name);
            });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          errorMsg={formik.errors.currentPassword}
          type={showCurrPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCurrPassword}
                  onMouseDown={handleMouseDownCurrPassword}
                  edge="end"
                >
                  {showCurrPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormTextInput
          name={passwordFormConfig.newPassword.name}
          value={formik.values.newPassword}
          placeholder={passwordFormConfig.newPassword.placeholder}
          label={passwordFormConfig.newPassword.label}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched(passwordFormConfig.newPassword.name).then(() => {
              formik.validateField(passwordFormConfig.newPassword.name);
            });
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          errorMsg={formik.errors.newPassword}
          type={showNewPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Tooltip title="Apply">
          <IconButton color="primary" type="submit" disabled={!formik.isValid}>
            <CheckCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton onClick={onClose}>
            <CancelOutlinedIcon />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Box>
  );
}

export default ChangePasswordForm;

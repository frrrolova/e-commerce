import { Customer } from '@commercetools/platform-sdk';
import { Box, Paper } from '@mui/material';
import LabelBox from '../LabelBox/LabelBox';
import EditableInput from '../EditableInput/EditableInput';
import { FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { firstNameSchema, lastNameSchema } from '@/core/commonValidation';
import { updateUser } from '@/services/userService';

function UserProfileData({ user }: { user: Customer }) {
  return (
    <div>
      <Paper
        sx={{
          marginTop: 10,
          maxWidth: '60%',
          paddingX: 2,
          paddingY: 3,
        }}
      >
        <LabelBox label="Personal Info">
          <Box>
            <EditableInput
              name={FieldNames.FIRST_NAME}
              value={user.firstName || ''}
              label={formFieldsConfig.firstName.profileLabel}
              schema={firstNameSchema}
              placeholder={formFieldsConfig.firstName.placeholder}
              onSaveClick={(value) => {
                console.log(value);
              }}
            />
            <EditableInput
              name={FieldNames.LAST_NAME}
              value={user.lastName || ''}
              label={formFieldsConfig.lastName.profileLabel}
              schema={lastNameSchema}
              placeholder={formFieldsConfig.lastName.placeholder}
              onSaveClick={(value) => {
                const updatedUser = { ...user };
                updatedUser.lastName = value;
                console.log(value);

                updateUser(
                  {
                    action: 'setLastName',
                    lastName: value,
                  },
                  user.version,
                );
              }}
            />
          </Box>
        </LabelBox>
      </Paper>
    </div>
  );
}

export default UserProfileData;

import * as Yup from 'yup';
import {
  addressSchema,
  dateOfBirthSchema,
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
} from './commonValidation';

const SignupSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  dateOfBirth: dateOfBirthSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

export default SignupSchema;

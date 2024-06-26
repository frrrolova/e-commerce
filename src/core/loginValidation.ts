import * as Yup from 'yup';
import { emailSchema, passwordSchema } from './commonValidation';

const SignupLoginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export default SignupLoginSchema;

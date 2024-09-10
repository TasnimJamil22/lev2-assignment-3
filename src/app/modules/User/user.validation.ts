import { z } from 'zod';

const signInValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    phone: z.string({ required_error: 'Phone number is required' }),
    role: z.enum(['user', 'admin'], { required_error: 'role is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  signInValidationSchema,
};

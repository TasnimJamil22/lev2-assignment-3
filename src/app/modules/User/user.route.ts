import express from 'express';
import { AuthValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signInValidationSchema),
  UserControllers.signUpUser,
);
router.post(
  '/login',
  auth(),
  validateRequest(AuthValidation.loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;

import express from 'express';
import { AuthValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
// import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signInValidationSchema),
  UserControllers.signUpUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  UserControllers.loginUser,
);

// router.post(
//   '/login',
//   auth(USER_ROLE.admin),
//   validateRequest(AuthValidation.loginValidationSchema),
//   UserControllers.loginUser,
// );

export const UserRoutes = router;

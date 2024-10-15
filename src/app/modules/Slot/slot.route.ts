import express from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidation } from './slot.validation';
// import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-slot',
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotControllers.createSlot,
);
// router.post(
//   '/create-slot',
//   auth(USER_ROLE.admin),
//   validateRequest(SlotValidation.createSlotValidationSchema),
//   SlotControllers.createSlot,
// );
router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;

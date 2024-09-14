import express from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidation } from './slot.validation';

const router = express.Router();

router.post(
  '/create-slot',
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotControllers.createSlot,
);
router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;

import express from 'express';
import { SlotControllers } from './slot.controller';
 
const router = express.Router();

router.post('/create-slot',SlotControllers.createSlot)

export const SlotRoutes = router;

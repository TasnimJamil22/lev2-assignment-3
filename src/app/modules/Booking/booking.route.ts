import express from 'express';
import { BookingControllers } from './booking.controller';

const router = express.Router();
router.post('/create-booking', BookingControllers.createABooking);

export const BookingRoutes = router;

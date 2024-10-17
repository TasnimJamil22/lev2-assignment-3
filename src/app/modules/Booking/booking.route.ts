import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();
router.post('/create-booking', BookingControllers.createABooking);
router.get('/getAllBookings', BookingControllers.getAllBookings);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getSpecificUsersBookings,
);

export const BookingRoutes = router;

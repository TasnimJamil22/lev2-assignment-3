import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createABooking,
);
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);
// router.get(
//   '/',
//   auth(USER_ROLE.user),
//   BookingControllers.getSpecificUsersBookings,
// );
router.put('/:id', auth(USER_ROLE.admin), BookingControllers.updateBooking);
router.delete('/:id', auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const BookingRoutes = router;

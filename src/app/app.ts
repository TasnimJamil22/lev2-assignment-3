import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';

import { UserRoutes } from './modules/User/user.route';
import { RoomRoutes } from './modules/Room/room.route';
import { SlotRoutes } from './modules/Slot/slot.route';
import { BookingRoutes } from './modules/Booking/booking.route';

//parsers
app.use(express.json());
app.use(cors());

//application routes
// app.use('/api/v1/users', UserRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/bookings', BookingRoutes);

//global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';
  console.log(message);
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});
export default app;

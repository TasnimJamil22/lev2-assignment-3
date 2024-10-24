import express, { Application, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';

import { UserRoutes } from './app/modules/User/user.route';
import { RoomRoutes } from './app/modules/Room/room.route';
import { SlotRoutes } from './app/modules/Slot/slot.route';
import { BookingRoutes } from './app/modules/Booking/booking.route';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { myBookingRoutes } from './app/modules/Booking/myBookings.route';

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('The application is running');
});
//application routes
// app.use('/api/v1/users', UserRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api/my-bookings', myBookingRoutes);
//not found
app.use(notFound);
//global error handler
app.use(globalErrorHandler);

export default app;

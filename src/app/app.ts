import express, { Application } from 'express';
const app: Application = express();

import cors from 'cors';

import { UserRoutes } from './modules/User/user.route';
import { RoomRoutes } from './modules/Room/room.route';
import { SlotRoutes } from './modules/Slot/slot.route';
import { BookingRoutes } from './modules/Booking/booking.route';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

//parsers
app.use(express.json());
app.use(cors());

//application routes
// app.use('/api/v1/users', UserRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/bookings', BookingRoutes);
//not found
app.use(notFound);
//global error handler
app.use(globalErrorHandler);

export default app;

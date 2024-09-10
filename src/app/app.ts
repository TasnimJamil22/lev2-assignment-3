import express, { Application, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';

import { UserRoutes } from './modules/User/user.route';
import { RoomRoutes } from './modules/Room/room.route';
import { SlotRoutes } from './modules/Slot/slot.route';

//parsers
app.use(express.json());
app.use(cors());

//application routes
// app.use('/api/v1/users', UserRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);
app.use('/api/slots', SlotRoutes);

export default app;

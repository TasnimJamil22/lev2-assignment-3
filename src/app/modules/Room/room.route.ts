import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';

const router = express.Router();

router.post(
  '/create-room',
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/:roomId', RoomControllers.getASingleRoomById);
router.get('/', RoomControllers.getAllRooms);
router.put('/:roomId', RoomControllers.updateRoom);
router.delete('/:roomId', RoomControllers.deleteRoom);
export const RoomRoutes = router;

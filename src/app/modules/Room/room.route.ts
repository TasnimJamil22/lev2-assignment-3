import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-room',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/:roomId', RoomControllers.getASingleRoomById);
// router.get('/', RoomControllers.getAllRooms);
// router.get('/', auth(), RoomControllers.getAllRooms);
router.get('/', auth(USER_ROLE.admin), RoomControllers.getAllRooms);
router.put('/:roomId', RoomControllers.updateRoom);
router.delete('/:roomId', RoomControllers.deleteRoom);
export const RoomRoutes = router;

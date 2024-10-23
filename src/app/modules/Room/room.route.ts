import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/:id', RoomControllers.getASingleRoomById);
// router.get('/', RoomControllers.getAllRooms);
// router.get('/', auth(), RoomControllers.getAllRooms);
router.get('/', RoomControllers.getAllRooms);
router.put('/:id', auth(USER_ROLE.admin), RoomControllers.updateRoom);
router.delete('/:id', auth(USER_ROLE.admin), RoomControllers.deleteRoom);
export const RoomRoutes = router;

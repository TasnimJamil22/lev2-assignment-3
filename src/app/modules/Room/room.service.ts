import { Room } from './room.model';
import { TRoom } from './room.interface';
import { ObjectId } from 'mongodb';

//create a room
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

//get a single room by id
const getASingleRoomFromDB = async (id: string) => {
  const result = await Room.findOne({ _id: id });
  return result;
};

//get all rooms
const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  return result;
};

//type of a updatedRoom
export type roomUpdate = {
  name?: string;
  roomNo?: number;
  floorNo?: number;
  capacity?: number;
  pricePerSlot?: number;
  amenities?: string[];
  isDeleted?: boolean;
};
//update a room by id
const updateRoomIntoDB = async (id: string, updatedRoom: roomUpdate) => {
  const result = await Room.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: updatedRoom?.name,
        roomNo: updatedRoom?.roomNo,
        floorNo: updatedRoom?.floorNo,
        capacity: updatedRoom?.capacity,
        pricePerSlot: updatedRoom?.pricePerSlot,
        amenities: updatedRoom?.amenities,
        isDeleted: updatedRoom?.isDeleted,
      },
    },
    { new: true },
  );
  return result;
};

//soft delete
//soft delete a room ( is not actually removed but isDelete: true , and then we use when app.get , we just search queries which are isDeleted:false, so it is remaining actually in the db, but shows deleted in the client side )
//here, {new:true} becuase when we'r deleting id, it is showing isDeleted:true after refreshing,so now solved
const deleteRoomSoftly = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getASingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomSoftly,
};

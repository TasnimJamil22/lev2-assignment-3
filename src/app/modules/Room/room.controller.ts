import { Request, Response } from 'express';
import { RoomServices } from './room.service';
import { RoomModel } from './room.model';

//create a room
const createRoom = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    const result = await RoomServices.createRoomIntoDB(room);
    console.log(result);
    //send response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room added successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to add room',
      error: error.message,
    });
  }
};

//get a single room by id
const getASingleRoomById = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const result = await RoomServices.getASingleRoomFromDB(roomId);
    // console.log(result);
    // console.log(roomId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room retrieved seccessfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 200,
      message: 'Failed to retrieve a single room',
      error: error.message,
    });
  }
};

//get all rooms
const getAllRooms = async (req: Request, res: Response) => {
  const allRooms = req.body;
  const result = await RoomServices.getAllRoomsFromDB();
  //will send response to client side
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Rooms retrieved seccessfully',
    data: result,
  });
};

//update a room by id
const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const updatedRoom = req.body;

    const result = await RoomServices.updateRoomIntoDB(roomId, updatedRoom);
    // console.log(result, roomId, updatedRoom);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 200,
      message: 'Failed to update a room',
      error: error.message,
    });
  }
};

//delete a room softly
const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const result = await RoomServices.deleteRoomSoftly(roomId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 200,
      message: 'Failed to delete a room',
      error: error.message,
    });
  }
};

export const RoomControllers = {
  createRoom,
  getASingleRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};

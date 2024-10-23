import { Types } from 'mongoose';

import { SlotModel } from './slot.model';

interface Slot {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const createSlotIntoDB = async (slots: Slot[]) => {
  try {
    // Insert the array of slots into the database
    const insertResult = await SlotModel.insertMany(slots);
    console.log('Inserted slots:', insertResult);
    return insertResult; // Return the result of the insertion
  } catch (error) {
    console.error('Error inserting slots:', error);
    throw new Error('Failed to insert slots'); // Provide meaningful error feedback
  }
};

// const createSlotIntoDB = async (eachSlots: any) => {

//   try {
//     // Insert the array of slots into the database
//     const insertSlotsIntoDB = await SlotModel.insertMany(eachSlots);
//     console.log(insertSlotsIntoDB);
//     const result = await SlotModel.find();
//     // return insertSlotsIntoDB;
//     return result;
//   } catch (error) {
//     console.error('Error inserting slots:', error);
//   }
// };

export type SlotQuery = {
  date?: string;
  roomId?: string;
};
//get available slots
const getAvailableSlotsFromDB = async (query: SlotQuery = {}) => {
  console.log(query);
  if (query.date && query.roomId) {
    const result = await SlotModel.aggregate([
      {
        $match: {
          date: query.date,
          room: new Types.ObjectId(query.roomId),
          isBooked: false,
        },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'roomDetails',
        },
      },
      {
        $unwind: '$roomDetails',
      },
      {
        $match: {
          'roomDetails.isDeleted': false,
        }, // Filter out soft-deleted rooms
      },
      {
        $project: {
          _id: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
          isBooked: 1,
          'room._id': '$roomDetails._id',
          'room.name': '$roomDetails.name',
          'room.roomNo': '$roomDetails.roomNo',
          'room.floorNo': '$roomDetails.floorNo',
          'room.capacity': '$roomDetails.capacity',
          'room.pricePerSlot': '$roomDetails.pricePerSlot',
          'room.amenities': '$roomDetails.amenities',
          'room.isDeleted': '$roomDetails.isDeleted',
        },
      },
    ]);
    console.log(result);
    return result;
  } else {
    const result = await SlotModel.find({ isBooked: false });

    console.log(result);
    return result;
  }

  //-----------------------------------------

  // Convert date to a Date object if needed
  // console.log('this is ', query);
  // if (query.date && query.roomId) {
  //   const result = await SlotModel.find({
  //     date: query.date,
  //     room: query.roomId,
  //   });
  //   console.log(result);
  //   return result;
  // } else {
  //   const result = await SlotModel.find();
  //   console.log(result);
  //   return result;
  // }

  //------------------------------------------
  // const result = await SlotModel.find();
  // console.log(result);
  // return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
};

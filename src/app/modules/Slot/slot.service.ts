import { TRoom } from '../Room/room.interface';
import { TSlot } from './slot.interface';
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
  // Convert date to a Date object if needed
  console.log('this is ', query);
  if (query.date && query.roomId) {
    const result = await SlotModel.find({
      date: query.date,
      room: query.roomId,
    });
    console.log(result);
    return result;
  } else {
    const result = await SlotModel.find();
    console.log(result);
    return result;
  }
  // const result = await SlotModel.find();
  // console.log(result);
  // return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
};

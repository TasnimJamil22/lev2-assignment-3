import { TSlot } from './slot.interface';
import { SlotModel } from './slot.model';

const createSlotIntoDB = async (eachSlots: any) => {
  // // const result = await SlotModel.create(payload);
  // const result = await SlotModel.insertMany(eachSlots);
  // return result;
  try {
    // Insert the array of slots into the database
    const insertSlotsIntoDB = await SlotModel.insertMany(eachSlots);
    const result = await SlotModel.find();
    return result;
  } catch (error) {
    console.error('Error inserting slots:', error);
  }
};

export const SlotServices = {
  createSlotIntoDB,
};

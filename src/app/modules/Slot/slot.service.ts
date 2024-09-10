import { TSlot } from './slot.interface';
import { SlotModel } from './slot.model';

const createSlotIntoDB = async (payload: TSlot) => {
  const result = await SlotModel.insertMany(payload);
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
};

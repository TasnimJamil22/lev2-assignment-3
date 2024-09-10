import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: { type: Boolean, required: true },
});

export const SlotModel = model<TSlot>('Slot', slotSchema);

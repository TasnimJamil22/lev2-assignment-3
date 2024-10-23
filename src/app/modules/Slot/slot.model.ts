import { model, Schema} from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' }, //referencing to Room model
  //it seems that , our each room will have multiple slots, that means , every slot will have the same room,so we referencing 'Room' model in slot.
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, required: true },
});

export const SlotModel = model<TSlot>('Slot', slotSchema);

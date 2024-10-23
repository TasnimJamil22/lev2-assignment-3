import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'Slot' }],
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  totalAmount: { type: Number },
  isConfirmed: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
  isDeleted: { type: Boolean, default: false },

  // slots: { type: [String], required: true },
  // room: { type: String, required: true },
  // user: { type: String, required: true },
});

export const BookingModel = model<TBooking>('Booking', bookingSchema);

import { Room } from '../Room/room.model';
import { SlotModel } from '../Slot/slot.model';
import { User } from '../User/user.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createABookingIntoDB = async (payload: TBooking) => {
  try {
    const date = payload?.date;
    const slots = await SlotModel.find({ _id: { $in: payload.slots } });
    const room = await Room.findById(payload?.room);
    const user = await User.findById(payload?.user);


    const result = await BookingModel.create({ date, slots, room, user });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const BookingServices = {
  createABookingIntoDB,
};

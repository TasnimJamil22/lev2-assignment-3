import AppError from '../../errors/AppError';
import { Room } from '../Room/room.model';
import { SlotModel } from '../Slot/slot.model';
import { User } from '../User/user.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

//create a booking in db
const createABookingIntoDB = async (payload: TBooking) => {
  try {
    const date = payload?.date;
    const slots = await SlotModel.find({ _id: { $in: payload.slots } });
    const room = await Room.findById(payload?.room);
    const user = await User.findById(payload?.user);

    const result = await BookingModel.create({ date, slots, room, user });

    //total amount/price

    const pricePerSlot = room?.pricePerSlot as number;
    const numberOfSlots = slots?.length;
    const totalAmount = pricePerSlot * numberOfSlots;
    const isConfirmed = 'unconfirmed';
    const isDeleted = 'false';

    return { result, totalAmount, isConfirmed, isDeleted };
  } catch (err) {
    console.log(err);
  }
};

//get all bookings from db
const getAllBookingsFromDB = async () => {
  try {
    const result = await BookingModel.find()
      .populate('slots')
      .populate('room')
      .populate('user');
    return result;
  } catch (error) {
    console.log(error);
  }
};

//specific users bookings
const getSpecificUsersBookingsfromDB = async (payload: any) => {
  try {
    console.log(payload);
    const user = await User.findOne({ email: payload });
    console.log('user:', user);
    console.log('userId:', user?._id);
    // .populate('slots')
    // .populate('room')
    // .populate('user');
    if (!user) {
      console.log('no user found');
    }
    const bookings = await BookingModel.find({ user: user?._id })
      .populate('slots')
      .populate('room')
      .populate('user');

    return bookings;
    // const userBookings = await BookingModel.find({ user: payload })
    //   .populate('slots')
    //   .populate('room')
    //   .populate('user');
    // return userBookings;
  } catch (err) {
    console.log(err);
  }
};
export const BookingServices = {
  createABookingIntoDB,
  getAllBookingsFromDB,
  getSpecificUsersBookingsfromDB,
};

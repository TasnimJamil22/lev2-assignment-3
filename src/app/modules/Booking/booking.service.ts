/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
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
    const result = await BookingModel.find({ isDeleted: false })
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
//type of a update booking
export type bookingUpdate = {
  date?: string;
  slots?: Types.ObjectId[];
  room?: Types.ObjectId;
  user?: Types.ObjectId;
  isConfirmed?: 'confirmed' | 'unconfirmed';
  isDeleted?: boolean;
};
//update a booking by id
const updateBookingIntoDB = async (
  id: string,
  updatedBooking: bookingUpdate,
) => {
  const result = await BookingModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        date: updatedBooking?.date,
        slots: updatedBooking?.slots,
        room: updatedBooking?.room,
        user: updatedBooking?.user,
        isConfirmed: updatedBooking?.isConfirmed,
        isDeleted: updatedBooking?.isDeleted,
      },
    },
    { new: true },
  );
  return result;
};
//delete a booking by id (softly delete)
const deleteABookingFromDB = async (id: string) => {
  const result = await BookingModel.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const BookingServices = {
  createABookingIntoDB,
  getAllBookingsFromDB,
  getSpecificUsersBookingsfromDB,
  updateBookingIntoDB,
  deleteABookingFromDB,
};

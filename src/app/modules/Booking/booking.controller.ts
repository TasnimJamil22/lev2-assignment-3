import { Request, Response } from 'express';
import { BookingModel } from './booking.model';
import { BookingServices } from './booking.service';

const createABooking = async (req: Request, res: Response) => {
  try {
    const {date,slots,room,user} = req.body;
    const result = await BookingServices.createABookingIntoDB({date,slots,room,user});

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const BookingControllers = {
  createABooking,
};

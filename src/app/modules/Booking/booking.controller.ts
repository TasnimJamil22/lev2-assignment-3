/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import { BookingServices } from './booking.service';

//create a booking
const createABooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { date, slots, room, user } = req.body;
    const result = await BookingServices.createABookingIntoDB({
      date,
      slots,
      room,
      user,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   statusCode: 500,
    //   message: 'failed to create a booking',
    //   error: error.message,
    // });
  }
};
//get all bookings
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingServices.getAllBookingsFromDB();
    //if there is no matching data or empty database
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All bookings retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//getting a specific users bookings
const getSpecificUsersBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const specificUser = req.user?.email as string;
    const { email } = req.user;
    console.log('email', email);

    const result = await BookingServices.getSpecificUsersBookingsfromDB(email);
    //if there is no matching data or empty database
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User bookings retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   statusCode: 500,
    //   message: 'failed to get user bookings',
    //   error: error.message,
    // });
  }
};
//update a booking by id
const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updatedBooking = req.body;
    console.log(updatedBooking);
    const result = await BookingServices.updateBookingIntoDB(
      id,
      updatedBooking,
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   statusCode: 500,
    //   message: 'failed to update a user bookings',
    //   error: error.message,
    // });
  }
};
//delete a booking by id (softly deleted)
const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BookingServices.deleteABookingFromDB(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   statusCode: 500,
    //   message: 'failed to delete a user booking',
    //   error: error.message,
    // });
  }
};
export const BookingControllers = {
  createABooking,
  getAllBookings,
  getSpecificUsersBookings,
  updateBooking,
  deleteBooking,
};

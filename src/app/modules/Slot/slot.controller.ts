/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { SlotQuery, SlotServices } from './slot.service';

const createSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slotsClient = req.body;
    const room = slotsClient.room;
    const date = slotsClient.date;
    const isBooked = slotsClient.isBooked;
    //slots
    const slotDuration = 60;
    const start = slotsClient.startTime;
    const end = slotsClient.endTime;
    //calculating start time in minutes since midnight

    // Split and parse start hours & minutes
    const [startHours, startMinutes] = start.split(':').map(Number);
    let startTimeInMinutes = startHours * 60 + startMinutes; // Calculate total minutes since midnight
    console.log(startHours, startMinutes);
    // Split and parse end hours & minutes
    const [endHours, endMinutes] = end.split(':').map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes; // Calculate total minutes since midnight

    //Calculate the total duration between the start and end times in minutes
    const totalDuration = endTimeInMinutes - startTimeInMinutes;

    // Generate Slot Time Intervals
    // Generate start and end times for each slot.
    function generateTimeSlots(
      room: string,
      date: string,
      start: string,
      end: string,
      slotDuration: any,
      isBooked: boolean,
    ) {
      const slots = [];
      // Number of Slots
      const numberOfSlots = totalDuration / slotDuration;

      // Loop until the current time reaches the end time
      // while (startTimeInMinutes < endTimeInMinutes) {
      for (let i = 0; i < numberOfSlots; i++) {
        // Format start time
        const startTime = formatTime(startTimeInMinutes);

        // Add the interval to get the end time of this slot
        const slotEndMinutes = startTimeInMinutes + slotDuration;

        // Format end time
        const endTime = formatTime(slotEndMinutes);

        // Push the slot to the array
        slots.push({ room, date, startTime, endTime, isBooked });

        // Move to the next slot
        startTimeInMinutes = slotEndMinutes;
      }
      // //making indexing for each slots
      // slots.forEach((slot, index) => {
      //   const slotIndexes = `Slot ${index + 1}: Start Time: "${slot.startTime}", End Time: "${slot.endTime}"`;
      //   console.log(slotIndexes);
      //   return slotIndexes;
      // });

      return slots;
    }

    // function to format time from minutes into "HH:MM" format
    function formatTime(minutes: any) {
      const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0');
      const mins = (minutes % 60).toString().padStart(2, '0');
      return `${hours}:${mins}`;
    }

    const eachSlots = generateTimeSlots(
      room,
      date,
      start,
      end,
      slotDuration,
      isBooked,
    );
    console.log(eachSlots);

    // console.log(
    //   room,
    //   start,
    //   end,
    //   startTimeInMinutes,
    //   endTimeInMinutes,
    //   totalDuration,
    //   slotsClient,
    // );

    const result = await SlotServices.createSlotIntoDB(eachSlots);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Slots created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
  //the below code when we dont use 'global error handler', and we repeated these codes ..
  // catch (error: any) {
  //   res.status(500).json({
  //     success: false,
  //     statusCode: 500,
  //     message: 'Failed to create a slot',
  //     error: error.message,
  //   });
  // }
};

//get available slots
const getAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract query parameters
    const query: SlotQuery = {
      date: req.query.date as string,
      roomId: req.query.roomId as string,
    };
    // let query = {};
    // let query: { date?: string; roomId?: string } = {};
    // if (req.query?.date && req.query?.roomId) {
    //   const query = {
    //     date: req.query.date as string,
    //     roomId: req.query.roomId as string,
    //   };
    // }
    // console.log(req.query?.date, req.query?.roomId);
    // const { date, roomId } = req.query as { date?: string; roomId?: string };

    // const date = req.query.date;
    // const roomId = req.query.roomId;
    const result = await SlotServices.getAvailableSlotsFromDB(query);
    console.log(result);
    // //if there is no matching data or empty database
    // if (!result || result.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     statusCode: 404,
    //     message: 'No Data Found',
    //     data: [],
    //   });
    // }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   statusCode: 500,
    //   message: 'Failed to retrieve available  slots',
    //   error: error.message,
    // });
    next(err);
  }
};
export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};

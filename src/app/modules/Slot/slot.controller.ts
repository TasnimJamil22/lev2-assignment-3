import { NextFunction, Request, Response } from 'express';
import { SlotServices } from './slot.service';
import { z } from 'zod';
import { TSlot } from './slot.interface';

const createSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let slotsClient = req.body;
    let room = slotsClient.room;
    let date = slotsClient.date;
    let isBooked = slotsClient.isBooked;
    //slots
    const slotDuration = 60;
    let start = slotsClient.startTime;
    let end = slotsClient.endTime;
    //calculating start time in minutes since midnight

    // Split and parse start hours & minutes
    let [startHours, startMinutes] = start.split(':').map(Number);
    let startTimeInMinutes = startHours * 60 + startMinutes; // Calculate total minutes since midnight
    console.log(startHours, startMinutes);
    // Split and parse end hours & minutes
    let [endHours, endMinutes] = end.split(':').map(Number);
    let endTimeInMinutes = endHours * 60 + endMinutes; // Calculate total minutes since midnight

    //Calculate the total duration between the start and end times in minutes
    const totalDuration = endTimeInMinutes - startTimeInMinutes;

    // Generate Slot Time Intervals
    // Generate start and end times for each slot.
    function generateTimeSlots(
      room: any,
      date: any,
      start: any,
      end: any,
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
        let startTime = formatTime(startTimeInMinutes);

        // Add the interval to get the end time of this slot
        let slotEndMinutes = startTimeInMinutes + slotDuration;

        // Format end time
        let endTime = formatTime(slotEndMinutes);

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
  } catch (error: any) {
    next();
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

export const SlotControllers = {
  createSlot,
};

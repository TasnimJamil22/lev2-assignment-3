import { z } from 'zod';
import { Types } from 'mongoose';

const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string({ required_error: 'room is required' }),
      date: z.string({ required_error: 'date is required' }),
      startTime: z
        .string({ invalid_type_error: 'Name must be a trulella' })
        .refine(
          (time) => {
            const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return regex.test(time);
          },
          {
            message: 'Invalid time format, expected "HH:MM" in 24 hours format',
          },
        ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; //00-19, 20-23 : 00-59 -- HH:MM format and here \d means each & every numbers from 0 to 9
          return regex.test(time);
        },
        { message: 'Invalid time format, expected "HH:MM" in 24 hours format' },
      ),
      isBooked: z.boolean({ required_error: 'isBooked is required' }),
    })
    .refine(
      (body) => {
        //startTime: 10:30 => 1999-01-01T10:30
        //endTime: 10:30 => 1999-01-01T12:30

        const start = new Date(`1999-01-01T${body.startTime}:00`);
        const end = new Date(`1999-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

export const SlotValidation = {
  createSlotValidationSchema,
};

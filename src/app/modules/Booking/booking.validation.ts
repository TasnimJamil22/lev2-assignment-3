import { z } from 'zod';

// Define the Zod validation schema for the booking model
const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ message: 'Date is required' }),
    slots: z
      .array(z.string().length(24, { message: 'Invalid Slot ID' }))
      .optional(), // Assuming ObjectId is 24 characters
    room: z.string().length(24, { message: 'Invalid Room ID' }).optional(), // Optional Room ID
    user: z.string().length(24, { message: 'Invalid User ID' }).optional(), // Optional User ID
    totalAmount: z.number().optional(),
    isConfirmed: z
      .enum(['confirmed', 'unconfirmed', 'canceled'])
      .default('unconfirmed'),
    isDeleted: z.boolean().default(false),
  }),
});

// Export the schema
export const BookingValidation = {
  createBookingValidationSchema,
};

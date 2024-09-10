import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    roomNo: z.number({ required_error: 'roomNo  is required' }),
    floorNo: z.number({ required_error: 'floorNo is required' }),
    capacity: z.number({ required_error: 'capacity is required' }),
    pricePerSlot: z.number({ required_error: 'pricePerSlot is required' }),
    amenities: z.array(z.string({ required_error: 'amenities are required' })),
    isDeleted: z.boolean({ required_error: 'isDeleted is required' }),
  }),
});

export const RoomValidation = {
  createRoomValidationSchema,
};

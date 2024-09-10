import { Request, Response } from 'express';
import { SlotServices } from './slot.service';

const createSlot = async (req: Request, res: Response) => {
  try {
    const slot = req.body;
    const result = await SlotServices.createSlotIntoDB(slot);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Slots created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to create a slot',
      error: error.message,
    });
  }
};

export const SlotControllers = {
  createSlot,
};

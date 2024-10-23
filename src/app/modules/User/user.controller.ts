/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.signUpUser(req.body);
    //send response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { user, token } = await UserServices.loginUser(req.body);

    //send response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: { user, token },
    });
  } catch (err: any) {
    console.error(err);
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: err.message || 'User not found',
    });
  }
};
export const UserControllers = {
  signUpUser,
  loginUser,
};

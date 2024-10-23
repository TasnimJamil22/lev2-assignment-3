/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from 'express';
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';
  const isProduction = process.env.NODE_ENV === 'production'; // Check if the environment is production
  console.log(message);
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages: [
      {
        path: '',
        message: message,
      },
    ],
    stack: isProduction ? null : err.stack, // Send stack trace only in non-production environments
  });
};

export default globalErrorHandler;

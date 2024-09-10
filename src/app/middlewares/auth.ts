import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    next();
  };
};

export default auth;

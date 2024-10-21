import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';

// custom Request can be made
// interface CustomRequest extends Request {
//   user: JwtPayload;
// }
const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers.authorization);
      const bearerToken = req.headers.authorization;
      // console.log("Bearer Token:",bearerToken);
      // const token = req.headers.authorization;
      const token = bearerToken?.split(' ')[1];
      // console.log('Token:', token);
      //   check if the token is sent from the client
      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is not given');
      }
      //check if the token is valid
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          //err
          if (err) {
            throw new AppError(
              StatusCodes.UNAUTHORIZED,
              'Token is not correct',
            );
          }
          console.log(decoded);
          //   const { email, role } = decoded;
          //check if the role is correct
          const role = (decoded as JwtPayload).role;

          // if (!(requiredRoles && requiredRoles.includes(role))) {
          if (!requiredRoles || !requiredRoles.includes(role)) {
            // console.log('Role provided:', role);
            // console.log('Type of role:', typeof role);
            // console.log('Required roles:', requiredRoles);
            // console.log(
            //   'Type of requiredRoles:',
            //   typeof requiredRoles,
            //   Array.isArray(requiredRoles),
            // );
            throw new AppError(StatusCodes.UNAUTHORIZED, 'role is not correct');
          }
          req.user = decoded as JwtPayload;
          const email = (decoded as JwtPayload).email;
          // console.log('Type of email:', typeof email);

          return next();
        },
      );
      //   return next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

// import { NextFunction, Request, Response } from 'express';
// import { AnyZodObject } from 'zod';
// import AppError from '../errors/AppError';
// import { StatusCodes } from 'http-status-codes';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/User/user.interface';

// //custom Request can be made
// // interface CustomRequest extends Request {
// //   user: JwtPayload;
// // }

// const auth = (...requiredRoles: TUserRole[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     //checking if the token is sent from the client
//     const token = req.headers.authorization;
//     console.log(token);
//     if (!token) {
//       throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
//     }
//     //checking if the token is  invalid token
//     jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//       function (err, decoded) {
//         // err
//         if (err) {
//           throw new AppError(
//             StatusCodes.UNAUTHORIZED,
//             'You are not authorized!!!!',
//           );
//         }
//         // decoded undefined
//         // console.log(decoded);

//         const role = (decoded as JwtPayload).role;
//         //checking if the role is valid
//         if (requiredRoles && !requiredRoles.includes(role)) {
//           throw new AppError(
//             StatusCodes.UNAUTHORIZED,
//             'You are not authorized!!!!',
//           );
//         }
//         req.user = decoded as JwtPayload;
//         next();
//       },
//     );
//   };
// };

// export default auth;

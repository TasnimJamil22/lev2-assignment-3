import { TLoginUser, TSignUpUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

import jwt from 'jsonwebtoken';
import config from '../../config';

const signUpUser = async (payload: TSignUpUser) => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // console.log(payload);
  //validate or check if the user(users email) is exist

  // try {
  // const isUserExists = await User.findOne({ email: payload?.email });
  // console.log(isUserExists);
  // if (!isUserExists) {
  //   throw new AppError(StatusCodes.NOT_FOUND, "This user doesn't exists");
  //   // throw new Error('This user doesnt exists');
  // }

  //checking if the password is correct
  // const isPasswordMactched = await bcrypt.compare(
  //   payload?.password,
  //   isUserExists.password,
  // );
  // console.log(isPasswordMactched);
  // return {};
  // } catch (err) {
  //   console.error(err);
  //   throw err; // Rethrow to handle in controller
  // }
  //validation with static method
  try {
    // console.log(await User.isUserExistsByEmail(payload.email));
    const user = await User.isUserExistsByEmail(payload.email);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'The user is not found!');
    }

    //check if password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not matched');
    }
    //authentication with JWT

    const jwtPayload = {
      email: user.email,
      role: user.role,
    };
    //create token and send to the client
    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: '120d',
    });
    console.log(token);
    return {
      token: token,
      user,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const UserServices = {
  loginUser,
  signUpUser,
};

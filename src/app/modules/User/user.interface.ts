import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TSignUpUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  address: string;
}
export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TSignUpUser> {
  // myStaticMethod(): number;
  isUserExistsByEmail(email: string): Promise<TSignUpUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

import { model, Schema } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
});
export const UserModel = model<User>('User', userSchema);

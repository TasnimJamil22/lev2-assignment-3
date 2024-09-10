import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TSignUpUser, UserModel } from './user.interface';

const userSchema = new Schema<TSignUpUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
});

//password security
//pre save middleware/hook will work on create() save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save our data');

  const user = this; //this: currently processing document
  //hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'post hook: we saved our data');
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TSignUpUser, UserModel>('User', userSchema);

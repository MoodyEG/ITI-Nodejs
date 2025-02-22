import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;

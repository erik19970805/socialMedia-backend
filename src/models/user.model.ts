import { LeanDocument, model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel } from '../interfaces/user.interface';

const userSchema: Schema<IUserModel> = new Schema(
  {
    fullname: { type: String, required: true, trim: true, maxlength: 25 },
    username: { type: String, required: true, trim: true, maxlength: 25, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/images-store-cloud/image/upload/v1612363725/user_tvlxpm.png',
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    story: { type: String, default: '', maxlength: 200 },
    website: { type: String, default: '' },
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    following: [{ type: Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.methods.toJSON = function (): LeanDocument<IUserModel> {
  const obj = this.toObject();
  return { ...obj, password: '' };
};

export default model<IUserModel>('User', userSchema);

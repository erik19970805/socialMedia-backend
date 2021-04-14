import { Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
  username: string;
  matchPassword: (password: string) => Promise<boolean>;
}

export interface IUser {
  fullname: string;
  username: string;
  email: string;
  password: string;
  gender: string;
}

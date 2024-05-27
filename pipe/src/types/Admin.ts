import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  profilePicture?: string;
  father?: string;
  mother?: string;
  children?:
    | {
        name: string;
        age: number;
        aadharnumber: number | null;
        pan: number | null;
      }[]
    | null;
  address?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

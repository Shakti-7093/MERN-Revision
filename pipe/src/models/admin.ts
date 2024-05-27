import mongoose from "mongoose";
import { IAdmin } from "../types/Admin";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  father: {
    type: String,
    ref: "Admin",
  },
  mother: {
    type: String,
    ref: "Admin",
  },
  children: [
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      aadharnumber: {
        type: Number,
        trim: true,
        default: null,
      },
      pan: {
        type: Number,
        trim: true,
        default: null,
      },
    },
  ],
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;

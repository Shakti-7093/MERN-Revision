import mongoose from "mongoose";
import { IClient } from "../types/Client";

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  clientname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileimage: {
    type: String,
    required: false,
  },
  credits: [
    {
      credittype: {
        type: String,
        required: true,
      },
      amount: Number,
    },
  ],
  accountdetails: [
    {
      accounttype: {
        type: String,
      },
      accountholdername: {
        type: String,
      },
      accountbalance: {
        type: String,
      },
      createdAt: {
        type: new Date(),
      },
      updatedAt: {
        type: new Date(),
      },
      deletedAt: {
        type: new Date(),
        default: null,
      },
      default: null,
    },
  ],
  isactive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "client",
  },
  createdAt: {
    type: new Date(),
  },
  updatedAt: {
    type: new Date(),
  },
  deletedAt: {
    type: new Date(),
    default: null,
  },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

export default Client;

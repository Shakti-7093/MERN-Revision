import * as mongoose from "mongoose";
import { IUser } from "../types/Users";

const userSchema = new mongoose.Schema({
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
    ref: "User",
  },
  mother: {
    type: String,
    ref: "User",
  },
  children: [
    {
      name: {
        type: String,
        trim: true,
      },
      age: {
        type: Number,
      },
    },
  ],
  address: {
    type: String,
    trim: true,
  },
  investments: [
    {
      typeofinvestment: String,
      amount: Number,
      date: {
        type: Date,
        default: null,
      },
      required: true,
    },
  ],
  married: {
    type: Boolean,
    default: false,
  },
  wife: {
    type: String,
  },
  contacts: [
    {
      phone: String,
      landline: String,
    },
  ],
  aadharnumber: {
    type: String,
    trim: true,
  },
  pan: {
    type: String,
    trim: true,
  },
  electionid: {
    type: String,
    trim: true,
  },
  bankdetails: [
    {
      accountnumber: {
        type: String,
        trim: true,
      },
      accounttype: {
        type: String,
        trim: true,
      },
      accountholdername: {
        type: String,
        trim: true,
      },
      ifsc: {
        type: String,
        trim: true,
      },
      bankname: {
        type: String,
        trim: true,
      },
      balance: {
        type: Number,
      },
    },
  ],
  loandetails: [
    {
      loantype: {
        type: String,
        trim: true,
      },
      loanamount: {
        type: Number,
      },
      loanemi: {
        type: Number,
      },
      loaninterest: {
        type: Number,
      },
      loanstartdate: {
        type: Date,
      },
      loanenddate: {
        type: Date,
      },
      loanbank: {
        type: String,
        trim: true,
      },
    },
  ],
  dematdetails: {
    dematnumber: {
      type: String,
      trim: true,
    },
    dpid: {
      type: String,
      trim: true,
    },
    dpname: {
      type: String,
      trim: true,
    },
    required: true,
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;

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
    default: "Unmarried",
  },
  contacts: [
    {
      phone: {
        type: String,
        trim: true,
        required: true,
      },
      landline: {
        type: String,
        trim: true,
      },
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
  transactions: [
    {
      transactiondate: {
        type: Date,
      },
      transactionamount: {
        type: Number,
      },
      transactiontype: {
        type: String,
        trim: true,
      },
      transactionmode: {
        type: String,
        trim: true,
      },
      transactionremarks: {
        type: String,
        trim: true,
      },
      default: null,
    },
  ],
  loandetails: [
    {
      loantype: {
        type: String,
        trim: true,
        default: null,
      },
      loanamount: {
        type: Number,
        default: null,
      },
      loanemi: {
        type: Number,
        default: null,
      },
      loaninterest: {
        type: Number,
        default: null,
      },
      loanstartdate: {
        type: Date,
        default: null,
      },
      loanenddate: {
        type: Date,
        default: null,
      },
      loanbank: {
        type: String,
        trim: true,
        default: null,
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
  dematlogindetails: {
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    required: true,
  },
  gstnumber: {
    type: String,
    trim: true,
    mathes: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i,
    message: "Invalid GST Number",
    minLenght: 15,
    maxLenght: 15,
    default: null,
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

import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  profilePicture?: string;
  father?: string;
  mother?: string;
  children?: {
    name: string;
    age: number;
    addharnumber: number | null;
    pan: number | null;
  }[];
  address?: string;
  investments?: {
    typeofinvestment: string;
    amount: number;
    date: Date | null;
  }[];
  marride: boolean;
  wife?: string;
  contacts: {
    phone: string;
    landline: string | null;
  }[];
  aadharnumber: string;
  pan: string;
  electionid: string;
  bankdetails: {
    accountnumber: string;
    accounttype: string;
    accountholdername: string;
    ifsc: string;
    bankname: string;
    balance: number;
  }[];
  transactions: {
    transactiondate: Date | null;
    transactionamount: number | null;
    transactiontype: string | null;
    transactionmode: string | null;
    transactionremarks: string | null;
  }[];
  loandetails: {
    loantype: string;
    loanamount: number;
    loanemi: number;
    loaninterest: number;
    loanstartdate: Date;
    loanenddate: Date;
    loanbank: string;
  }[];
  dematdetails: {
    dematnumber: string;
    dpid: string;
    dpname: string;
  };
  dematlogindetails: {
    username: string;
    password: string;
  };
  gstnumber: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

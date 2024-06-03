import mongoose from "mongoose";

export interface IClient extends mongoose.Document {
  id?: string;
  clientname: string;
  username: string;
  password: string;
  profileimage: string;
  credits: [
    {
      credittype: string;
      amount: number;
    }
  ];
  accountdetails: [
    {
      accounttype: string;
      accountholdername: string;
      accountbalance: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }
  ];
  isactive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

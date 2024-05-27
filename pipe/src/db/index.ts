import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pipe");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const disconnect = async () => {
  try {
    console.log("Disconnected from MongoDB");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

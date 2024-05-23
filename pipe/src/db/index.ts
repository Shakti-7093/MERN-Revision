import * as mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pipe");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB: ", error);
  }
};

export const drop = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("Dropped MongoDB database");
  } catch (error) {
    console.error("Error dropping MongoDB database: ", error);
  }
};

export const seed = async () => {
  try {
    const fruits = [
      { name: "Apple", price: 199, quantity: 2 },
      { name: "Banana", price: 99, quantity: 5 },
      { name: "Cherry", price: 299, quantity: 1 },
      { name: "Date", price: 149, quantity: 3 },
      { name: "Elderberry", price: 399, quantity: 4 },
    ];

    await mongoose.connection.collection("fruits").insertMany(fruits);
    console.log("Seeded MongoDB database");
  } catch (error) {
    console.log("Error seeding MongoDB database: ", error);
  }
};

export const reset = async () => {
  try {
    await drop();
    await seed();
    console.log("Reset MongoDB database");
  } catch (error) {
    console.error("Error resetting MongoDB database: ", error);
  }
};

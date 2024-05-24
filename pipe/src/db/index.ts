import * as mongoose from "mongoose";

export const connect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/pipe";

    mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
      });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export const disconnect = async () => {
  try {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB: ", error);
  }
};

export const drop = async () => {
  try {
    mongoose.connection.dropDatabase();
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
      { name: "Fig", price: 249, quantity: 2 },
      { name: "Grape", price: 199, quantity: 2 },
      { name: "Honeydew", price: 99, quantity: 5 },
      { name: "Jackfruit", price: 299, quantity: 1 },
      { name: "Kiwi", price: 149, quantity: 3 },
      { name: "Lemon", price: 399, quantity: 4 },
      { name: "Mango", price: 249, quantity: 2 },
      { name: "Nectarine", price: 199, quantity: 2 },
      { name: "Orange", price: 99, quantity: 5 },
      { name: "Peach", price: 299, quantity: 1 },
      { name: "Quince", price: 149, quantity: 3 },
      { name: "Raspberry", price: 399, quantity: 4 },
      { name: "Strawberry", price: 249, quantity: 2 },
      { name: "Tangerine", price: 199, quantity: 2 },
      { name: "Ugli", price: 99, quantity: 5 },
      { name: "Vanilla", price: 299, quantity: 1 },
      { name: "Watermelon", price: 149, quantity: 3 },
      { name: "Xigua", price: 399, quantity: 4 },
      { name: "Yellow", price: 249, quantity: 2 },
      { name: "Zucchini", price: 199, quantity: 2 },
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

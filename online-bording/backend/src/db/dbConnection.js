const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});
db.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});
db.on("connected", function () {
  console.log("Mongoose default connection is open");
});

module.exports = db;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentsModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  conform_password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middel_name: String,
  last_name: {
    type: String,
    required: true,
  },
  fathers_name: {
    type: String,
    required: true,
  },
  mothers_name: {
    type: String,
    required: true,
  },
  profile_image: {
    type: FormData,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["student"],
    default: "student",
  },
  class: {
    type: String,
    enum: ["5th", "6th", "7th", "8th", "9th", "10th", "12th"],
    required: true,
  },
  token: String,
  access_token: String,
  security_token: String,
  createtedAt: new Date.now(),
  updatetedAt: {
    type: Date,
    default: new Date.now(),
  },
  deletetedAt: {
    type: Date,
    default: null,
  },
});

const Students = mongoose.model("Students", StudentsModel);

module.exports = Students;

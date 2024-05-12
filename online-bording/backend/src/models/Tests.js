const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Test model
const TestModel = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  date_of_exam: {
    type: Date,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Test = mongoose.model("Test", TestModel);

module.exports = Test;

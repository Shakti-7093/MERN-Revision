const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResultModel = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  subject_name: {
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

const Result = mongoose.model("Result", ResultModel);

module.exports = Result;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExamsModel = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  exam_details: [
    {
      chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapters",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
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

const Exams = mongoose.model("Exams", ExamsModel);

module.exports = Exams;

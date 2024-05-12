const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChaptersModel = new Schema({
  class: {
    type: String,
    required: true,
  },
  chapter_name: {
    type: String,
    required: true,
  },
  questions_details: [
    {
      question: {
        type: String,
        required: true,
      },
      options_one: {
        type: Number,
        required: true,
      },
      options_two: {
        type: Number,
        required: true,
      },
      options_three: {
        type: Number,
        required: true,
      },
      options_four: {
        type: Number,
        required: true,
      },
    },
  ],
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

const Chapters = mongoose.model("Chapters", ChaptersModel);

module.exports = Chapters;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubjectsSchema = new Schema({
  class: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  chapters: [
    {
      chapter_name: {
        type: String,
        required: true,
      },
      questions: [
        {
          question: {
            type: String,
            required: true,
          },
          options: [
            {
              option: {
                type: String,
                required: true,
              },
              is_correct: {
                type: Boolean,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
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

const Subjects = mongoose.model("Subjects", SubjectsSchema);

module.exports = Subjects;

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  questionLink: {
    type: String,
    required: true,
  },
});

const Questions = mongoose.model("Questions",QuestionSchema)
module.exports = Questions 
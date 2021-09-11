const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

const Questions = require("./server/models/Questions");


app.use(express.json());
app.use(cors())

mongoose.connect(
  "mongodb+srv://admin_MJS:panduranga10@basiccrud.l3qf8.mongodb.net/crudquestionlist?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const questionName = req.body.questionName
  const difficultyLevel = req.body.difficultyLevel
  const topic = req.body.topic
  const questionLink = req.body.questionLink
  const question = new Questions({questionName: questionName, difficultyLevel : difficultyLevel , topic : topic, questionLink : questionLink})

  try {
    await question.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
})
app.get("/read", async (req, res) => {
  Questions.find({} , (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.put("/update", async (req, res) => {
  const newQuestionName = req.body.newQuestionName;
  const id = req.body.id

  try {
    await Questions.findById(id, (err,updatedQuestionName) => {
      updatedQuestionName.questionName = newQuestionName
      updatedQuestionName.save();
      res.send("update");

    })
  } catch (err) {
    console.log(err);
  }
})

app.delete("/delete/:id", async(req, res) => {
  const id = req.params.id;

  await Questions.findByIdAndRemove(id).exec();
  res.send("deleted");
})

app.listen(8000, () => {
  console.log("Server running on port 8000...");
});

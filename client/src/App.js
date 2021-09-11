import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [questionName, setQuestioname] = useState("");
  const [newQuestionName, setNewQuestioname] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [url, setUrl] = useState("");

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/read").then((response) => {
      setQuestionList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:8000/insert", {
      questionName: questionName,
      difficultyLevel: difficultyLevel,
      topic: topic,
      questionLink: url,
    });
  };

  const updateQuestion = (id) => {
    Axios.put("http://localhost:8000/update", {
      id: id,
      newQuestionName: newQuestionName,
    });
  };

  const deleteQuestion = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`, {});
  };

  return (
    <div className="App">
      <h1>DSA Question Bank</h1>
      <div className="input-group mb-3 container">
        <span className="input-group-text" id="basic-addon1">
          Question Name
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the question name"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setQuestioname(event.target.value);
          }}
        />
      </div>
      <div className="input-group mb-3 container">
        <span className="input-group-text" id="basic-addon1">
          Difficulty Level
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Easy, Medium or Hard"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setDifficultyLevel(event.target.value);
          }}
        />
      </div>
      <div className="input-group mb-3 container">
        <span className="input-group-text" id="basic-addon1">
          Topic
        </span>
        <input
          type="text"
          className="form-control"
          placeholder=""
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setTopic(event.target.value);
          }}
        />
      </div>
      <div className="input-group mb-3 container">
        <span className="input-group-text" id="basic-addon1">
          URL
        </span>
        <input
          type="text"
          className="form-control"
          placeholder=""
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
      </div>

      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary" type="button" onClick={addToList}>
          Add
        </button>
      </div>

      <h1 className="display-1">Question List</h1>
      {questionList.map((val, key) => {
        return (
          <div className="container" key={key}>
            <br />
            <br />
            <div class="card bg-info">
              <div class="card-header">{val.questionName}</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>Difficulty Level:- {val.difficultyLevel}</p>
                  <a href={val.questionLink} className="btn btn-primary">
                    Go to problem
                  </a>
                </blockquote>
                <input
                  type="text"
                  placeholder="New Question Name ..."
                  onChange={(event) => {
                    setNewQuestioname(event.target.value);
                  }}
                />
                <br />
                <br />
                <button
                  onClick={() => updateQuestion(val._id)}
                  className="btn btn-primary mr-10"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteQuestion(val._id)}
                  className="btn btn-danger"
                >
                  Delete
                  <br />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

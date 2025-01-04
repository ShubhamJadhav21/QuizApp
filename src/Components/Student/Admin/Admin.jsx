import React, { useState } from "react";
import style from "./Admin.module.css";
import { Link } from "react-router-dom";

export default function Admin() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [percentage, setPercentage] = useState("");
  const [correctQuestion, setCorrectQuestion] = useState(null);
  const [errors, setErrors] = useState({
    topicError: "",
    questionError: "",
    percentageError: "",
  });
  const [showInput, setShowInput] = useState(true); // New state to control input visibility

  function getTopic(e) {
    setTopic(e.target.value);
  }

  function getTotalQuestions(e) {
    setQuestion(e.target.value);
  }

  function getPercentage(e) {
    setPercentage(e.target.value);
  }

  // Validate inputs and show errors if needed
  function calculate() {
    let topicError = "";
    let questionError = "";
    let percentageError = "";

    if (!topic) {
      topicError = "Topic is required.";
    }

    if (!question || parseInt(question) < 10) {
      questionError = "Please enter at least 10 questions.";
    }

    if (
      !percentage ||
      parseInt(percentage) <= 0 ||
      parseInt(percentage) > 100
    ) {
      percentageError = "Please enter a valid passing percentage (1-100).";
    }

    if (topicError || questionError || percentageError) {
      setErrors({ topicError, questionError, percentageError });
    } else {
      const correctQuestionsRequired = Math.ceil(
        (parseInt(question) * parseInt(percentage)) / 100
      );
      setCorrectQuestion(correctQuestionsRequired);
      setErrors({ topicError: "", questionError: "", percentageError: "" });

      setShowInput(false);

      // Save the data to localStorage
      const dataToSave = {
        topic,
        totalQuestions: question,
        passingPercentage: percentage,
        correctQuestionsRequired: correctQuestionsRequired,
      };
      localStorage.setItem("quizCriteria", JSON.stringify(dataToSave)); // Store in localStorage
    }
  }
  const clearLocalStorage = () => {
    // Remove quiz criteria and questions data from localStorage
    localStorage.removeItem("quizCriteria");
    localStorage.removeItem("questionsList");

    // Reset the form state and any other states if needed
    setTopic("");
    setQuestion("");
    setPercentage("");
    setCorrectQuestion(null);
    setErrors({
      topicError: "",
      questionError: "",
      percentageError: "",
    });
    setShowInput(true); // Reset to show the input form again

    // Optionally, alert the user
    alert("Test Deleted");
  };

  return (
    <div className={style.wrapper}>
      {/* Conditionally render the input fields or the table */}
      {showInput ? (
        <>
          <div className={style.topicInput}>
            <input
             className={style.inp}
              type="text"
              placeholder="Enter Topic"
              value={topic}
              onChange={getTopic}
            />
            {errors.topicError && (
              <div className={style.error}>{errors.topicError}</div>
            )}
          </div>

          <div className={style.questionInput}>
            <input
              type="number"
              placeholder="How many questions"
              value={question}
              onChange={getTotalQuestions}
            />
            {errors.questionError && (
              <div className={style.error}>{errors.questionError}</div>
            )}
          </div>

          <div className={style.percentageInput}>
            <input
              type="number"
              placeholder="Enter passing percentage"
              value={percentage}
              onChange={getPercentage}
            />
            {errors.percentageError && (
              <div className={style.error}>{errors.percentageError}</div>
            )}
          </div>
<div className={style.btns}>
          <button onClick={calculate}>Add Criteria</button>
          <button onClick={clearLocalStorage} className={style.clearBtn}>
           Delete Previous Test
      </button>
      </div>
        </>
        
      ) : (
        // Display the table after calculation
        <div className={style.displayData}>
          <h3>Entered Data & Calculation</h3>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Topic</strong>
                </td>
                <td>{topic}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Questions</strong>
                </td>
                <td>{question}</td>
              </tr>
              <tr>
                <td>
                  <strong>Passing Percentage</strong>
                </td>
                <td>{percentage}%</td>
              </tr>
              <tr>
                <td>
                  <strong>Correct Questions Needed to Pass</strong>
                </td>
                <td>{correctQuestion}</td>
              </tr>
            </tbody>
          </table>
          <button className={style.add_btn}>
            <Link to={"/addquestions"} id={style.add}>Add Questions</Link>
          </button>
          
        </div>
      )}
    </div>
  );
}

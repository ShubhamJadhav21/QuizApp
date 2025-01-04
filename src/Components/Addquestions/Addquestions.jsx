import React, { useState, useEffect } from "react";
import style from "./Addquestions.module.css";

export default function Addquestions() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Four options
  const [correctOptionIndex, setCorrectOptionIndex] = useState(""); // Correct answer index
  const [questionsList, setQuestionsList] = useState(() => {
    const savedData = localStorage.getItem("questionsList");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("questionsList", JSON.stringify(questionsList));
  }, [questionsList]);

  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (e) => setCorrectOptionIndex(e.target.value);

  const handleAddQuestion = () => {
    if (
      !question.trim() ||
      options.some((option) => !option.trim()) ||
      correctOptionIndex === ""
    ) {
      alert(
        "Please fill in the question, all options, and select the correct option."
      );
      return;
    }

    const correctOptionValue = options[parseInt(correctOptionIndex)]; 

    const newQuestion = {
      question,
      options,
      correctOption: {
        index: parseInt(correctOptionIndex),
        value: correctOptionValue,
      },
    };

    setQuestionsList([...questionsList, newQuestion]);
    setQuestion(""); // Reset question input
    setOptions(["", "", "", ""]); // Reset options
    setCorrectOptionIndex(""); // Reset correct option
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="question">Enter Question:</label>
        <input
          type="text"
          className={style.inp}
          id="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Type your question here"
        />

        <div>
          <label>Enter Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={style.opt_inp}
              />
            </div>
          ))}
        </div>

        <div>
          <label>Select Correct Option:</label>
          <select value={correctOptionIndex} onChange={handleCorrectOptionChange}>
            <option value="">-- Select Correct Option --</option>
            {options.map((option, index) => (
              <option key={index} value={index}>
                Option {index + 1}: {option}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleAddQuestion}>
          Add {questionsList.length + 1}
        </button>
      </form>

      
      
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import style from './Student.module.css';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questionsList");
    if (storedQuestions) {
      const questions = JSON.parse(storedQuestions);
      setQuestionsList(questions);
      setIsLastQuestion(questions.length === 1);
    }
  }, []);

  const handleRadioChange = (option, questionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option; 
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if (currentQuestionIndex + 1 === questionsList.length - 1) {
      setIsLastQuestion(true);
    } else {
      setIsLastQuestion(false);
    }
  };

  const handleSubmit = () => {
    let correctAnswersCount = 0;
  
    questionsList.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOption.value) {
        correctAnswersCount++;
      }
    });
  
    const criteriaData = JSON.parse(localStorage.getItem("criteria"));
    const passingPercentage = criteriaData ? criteriaData.percentage : 0;
  
    const requiredCorrectAnswers = Math.ceil(
      (questionsList.length * passingPercentage) / 100
    );
  
    const result = {
      totalQuestions: questionsList.length,
      correctAnswers: correctAnswersCount,
      percentage: (correctAnswersCount / questionsList.length) * 100,
      passingPercentage: passingPercentage,
      requiredCorrectAnswers: requiredCorrectAnswers,
    };
  
    const isPassed = correctAnswersCount >= requiredCorrectAnswers;
    const resultMessage = isPassed
      ? `You passed! ${correctAnswersCount}/${questionsList.length} correct answers (${result.percentage.toFixed(2)}%)`
      : `You failed. You needed at least ${requiredCorrectAnswers} correct answers to pass. You got ${correctAnswersCount} correct answers (${result.percentage.toFixed(2)}%).`;
  
    alert(resultMessage);
    navigate('/');
  };

  if (questionsList.length === 0) {
    return <div className={style.container}>No Quiz Available</div>;
  }

  const currentQuestion = questionsList[currentQuestionIndex];

  return (
    <div className={style.container}>
      <h1>Student Quiz</h1>

      <div className={style.questionContainer}>
        <h3>{currentQuestionIndex + 1}. {currentQuestion.question}</h3>
        <div className={style.options}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={style.optionBox}
              onClick={() => handleRadioChange(option, currentQuestionIndex)} // Handle click on option
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                id={`option-${currentQuestionIndex}-${index}`}
                checked={selectedAnswers[currentQuestionIndex] === option} 
                onChange={() => handleRadioChange(option, currentQuestionIndex)}
                className={style.radioInput}
              />
              <label htmlFor={`option-${currentQuestionIndex}-${index}`} className={style.optionLabel}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={style.buttons}>
        {isLastQuestion ? (
          <button className={style.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className={style.nextBtn} onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

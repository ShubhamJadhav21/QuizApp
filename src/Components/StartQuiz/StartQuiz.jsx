import React, { useState, useEffect } from 'react';
import style from './StartQuiz.module.css';
import { Link } from 'react-router-dom';

export default function StartQuiz() {
  const [topic, setTopic] = useState('');
  const [isTestAvailable, setIsTestAvailable] = useState(true); 
  const [passingPercentage, setPassingPercentage] = useState('');

  // Retrieve the topic and other data from local storage when the component mounts
  useEffect(() => {
    const criteriaData = localStorage.getItem('quizCriteria');
    if (criteriaData) {
      const parsedCriteria = JSON.parse(criteriaData);
      const topicFromStorage = parsedCriteria.topic;
      const passingPercentageFromStorage = parsedCriteria.passingPercentage;

      setTopic(topicFromStorage); 
      setPassingPercentage(passingPercentageFromStorage); 
      setIsTestAvailable(!!topicFromStorage);
    } else {
      setIsTestAvailable(false); 
    }
  }, []);

  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);

  return (
    <div className={style.wrapper}>
      {isTestAvailable ? (
        <>
          <h1>Topic: {topic}</h1>
          <div className={style.dateTime}>
            <p><span>Date: </span>{formattedDate}</p>
            <p><span>Day: </span>{formattedDay}</p>
            <p><span>Passing Percentage: </span>{passingPercentage}%</p>
          </div>
          <button className={style.startBtn}>
            <Link to={'/student'} className={style.start}>Start Quiz</Link>
          </button>
        </>
      ) : (
        <>
          <h1>No test today</h1>
          <div className={style.dateTime}>
            <p><span>Date: </span>{formattedDate}</p>
            <p><span>Day: </span>{formattedDay}</p>
          </div>
          
        </>
      )}
    </div>
  );
}

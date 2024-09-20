import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value
    });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/grade', { answers })
      .then(response => {
        setScore(response.data.score);
        setSubmitted(true);
      })
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div>
      {!submitted ? (
        <div>
          {questions.map(question => (
            <div key={question.id}>
              <h3>{question.question}</h3>
              {question.type === 'MCQ' && (
                question.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question${question.id}`}
                      value={option}
                      onChange={(e) => handleChange(e, question.id)}
                    />
                    {option}
                  </div>
                ))
              )}
              {question.type === 'TrueFalse' && (
                ['True', 'False'].map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question${question.id}`}
                      value={option}
                      onChange={(e) => handleChange(e, question.id)}
                    />
                    {option}
                  </div>
                ))
              )}
              {question.type === 'FillInTheBlank' && (
                <input
                  type="text"
                  onChange={(e) => handleChange(e, question.id)}
                />
              )}
              {question.type === 'Descriptive' && (
                <textarea
                  maxLength="250"
                  onChange={(e) => handleChange(e, question.id)}
                />
              )}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <Result score={score} />
      )}
    </div>
  );
};

export default QuestionForm;

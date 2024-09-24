import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch questions from your backend API
    axios.get('http://localhost:5000/api/questions')
      .then(response => {
        const uniqueQuestions = response.data.filter((question, index, self) =>
          index === self.findIndex(q => q.question === question.question)
        );
        setQuestions(uniqueQuestions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    // Timer to automatically move to the next question
    const timer = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmit(); // Automatically submit when the last question is reached
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [currentQuestionIndex, questions.length]);

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Calculate the score based on answers
    // (You may want to implement this calculation differently)
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
          {questions.length > 0 && (
            <div key={questions[currentQuestionIndex].id}>
              <h3>{questions[currentQuestionIndex].question}</h3>
              {questions[currentQuestionIndex].type === 'MCQ' && (
                questions[currentQuestionIndex].options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question${questions[currentQuestionIndex].id}`}
                      value={option}
                      onChange={(e) => handleChange(e, questions[currentQuestionIndex].id)}
                    />
                    {option}
                  </div>
                ))
              )}
              {questions[currentQuestionIndex].type === 'TrueFalse' && (
                ['True', 'False'].map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question${questions[currentQuestionIndex].id}`}
                      value={option}
                      onChange={(e) => handleChange(e, questions[currentQuestionIndex].id)}
                    />
                    {option}
                  </div>
                ))
              )}
              {questions[currentQuestionIndex].type === 'FillInTheBlank' && (
                <input
                  type="text"
                  onChange={(e) => handleChange(e, questions[currentQuestionIndex].id)}
                />
              )}
              {questions[currentQuestionIndex].type === 'Descriptive' && (
                <textarea
                  maxLength="250"
                  onChange={(e) => handleChange(e, questions[currentQuestionIndex].id)}
                />
              )}
            </div>
          )}
          {/* Displaying a simple message indicating time left */}
          <p>You will be taken to the next question in 10 seconds...</p>
        </div>
      ) : (
        <Result score={score} />
      )}
    </div>
  );
};

export default QuestionForm;

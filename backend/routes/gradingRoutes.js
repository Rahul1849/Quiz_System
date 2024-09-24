const express = require('express');
const router = express.Router();

module.exports = function(db) {
  router.post('/', (req, res) => {
    const { answers } = req.body; // User's submitted answers
    let score = 0;

    // Fetch questions from the database
    db.query('SELECT * FROM questions', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query failed' });
      }

      results.forEach((question) => {
        const submittedAnswer = answers[question.id]; // Match answer by question id

        // Skip if the user hasn't answered this question
        if (!submittedAnswer) {
          return;
        }

        // Normalize the user's answer and correct answer for comparison (ignore case and trim spaces)
        const normalizedSubmittedAnswer = submittedAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = question.answer.trim().toLowerCase();

        switch (question.type) {
          case 'MCQ':
          case 'TrueFalse':
            // For MCQ and TrueFalse, check if the answer matches exactly
            if (normalizedSubmittedAnswer === normalizedCorrectAnswer) {
              score++;
            }
            break;

          case 'FillInTheBlank':
            // For FillInTheBlank, check if the user entered the correct answer
            if (normalizedSubmittedAnswer === normalizedCorrectAnswer) {
              score++;
            }
            break;

          case 'Descriptive':
            // Descriptive questions need a better grading system, but for now we give a random score of 1 or 2
            const randomScore = Math.floor(Math.random() * 2) + 1;
            score += randomScore;
            break;

          default:
            // Handle unexpected question types
            console.error(`Unknown question type: ${question.type}`);
        }
      });

      // Send back the score
      res.json({ score });
    });
  });

  return router;
};

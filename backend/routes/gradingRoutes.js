const express = require('express');
const router = express.Router();

module.exports = function(db) {
  router.post('/', (req, res) => {
    const { answers } = req.body;
    let score = 0;

    // Fetch questions from the database
    db.query('SELECT * FROM questions', (err, results) => {
      if (err) return res.status(500).send(err);

      // Iterate over each question from the database
      results.forEach((question) => {
        const submittedAnswer = answers[question.id];  // Match answer by question id

        // Grading logic for MCQ and True/False
        if (question.type === 'MCQ' || question.type === 'TrueFalse') {
          if (submittedAnswer && submittedAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
            score++;
          }
        }
        // Grading logic for Fill-in-the-Blank
        else if (question.type === 'FillInTheBlank') {
          if (submittedAnswer && submittedAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
            score++;
          }
        }
        // Grading logic for Descriptive questions
        else if (question.type === 'Descriptive') {
          // Basic logic for descriptive grading (randomly give 1 or 2 points)
          const randomScore = Math.floor(Math.random() * 2) + 1;
          score += randomScore;
        }
      });

      // Return the score
      res.json({ score });
    });
  });

  return router;
};

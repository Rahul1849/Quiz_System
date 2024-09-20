CREATE DATABASE quiz_app;

USE quiz_app;

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('MCQ', 'TrueFalse', 'FillInTheBlank', 'Descriptive') NOT NULL,
    question TEXT NOT NULL,
    options JSON,  -- JSON array for MCQ options
    answer TEXT
);

INSERT INTO questions (type, question, options, answer) VALUES
('MCQ', 'What is the capital of France?', '["Paris", "London", "Berlin", "Madrid"]', 'Paris'),
('TrueFalse', 'Is the sky blue?', '[]', 'True'),
('FillInTheBlank', 'The chemical symbol for water is ___.', '[]', 'H2O'),
('Descriptive', 'Explain the theory of relativity.', '[]', '');

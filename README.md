# Quiz Application

This project is a Quiz Application that enables users to participate in quizzes, submit their answers, and receive scores based on their responses. The application consists of a frontend built with React, a backend built with Node.js and Express, and a MySQL database for storing quiz questions and answers.

## Features

- User-friendly interface for answering quizzes.
- Supports multiple question types: Multiple Choice, True/False, Fill in the Blank, and Descriptive.
- Score calculation based on user responses.
- RESTful API for interaction between frontend and backend.

## Technologies

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL
- Tools: Postman for API testing


Running the Quiz Application Locally
To run the Quiz Application on your system, follow these steps:

Clone the Repository

Open your terminal and run the following command to clone the repository: git clone https://github.com/yourusername/your-repo-name.git
(Replace yourusername with your GitHub username and your-repo-name with the name of your repository.)

Navigate to the Project Directory

Change into the project directory:

cd your-repo-name
Set Up the Backend

Navigate to the backend directory:


cd backend
Install the backend dependencies:

npm install
Create the MySQL database by running the schema.sql file. You can do this using a MySQL client or command line.

Start the backend server:

node app.js
The server should now be running on http://localhost:5000.

Set Up the Frontend

Open a new terminal window and navigate to the frontend directory:

cd ../frontend
Install the frontend dependencies:

npm install
Start the frontend application:

npm start
The frontend should now be running on http://localhost:3000.

Access the Application

Open your web browser and go to http://localhost:3000 to access the Quiz Application.

Additional Notes
Ensure that you have Node.js and MySQL installed on your machine.

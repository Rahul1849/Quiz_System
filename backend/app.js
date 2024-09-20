const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const questionRoutes = require('./routes/questionRoutes');
const gradingRoutes = require('./routes/gradingRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySql$2024',
  database: 'quiz_app'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use('/api/questions', questionRoutes(db));
app.use('/api/grade', gradingRoutes(db));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

const express = require('express');
const router = express.Router();

module.exports = function(db) {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM questions', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });

  return router;
};

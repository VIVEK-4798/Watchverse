const express = require('express');
const router = express.Router();
const db = require('../db');

// Register route
router.post('/register', (req, res) => {
  const { name, email, password, genres } = req.body;

  if (!name || !email || !password || genres.length < 2) {
    return res.status(400).json({ message: 'Please fill all fields and select at least 2 genres.' });
  }

  const genresString = JSON.stringify(genres);

  const sql = 'INSERT INTO users (name, email, password, genres) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, genresString], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, genres } = req.body;

  if (!name || !email || !password || genres.length < 2) {
    return res.status(400).json({ message: 'Please fill all fields and select at least 2 genres.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const genresString = JSON.stringify(genres);

    const sql = 'INSERT INTO users (name, email, password, genres) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, genresString], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });

  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Error processing registration' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    try {
      // 2. Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 3. Login successful
      res.status(200).json({ message: 'Login successful', userId: user.id });

    } catch (compareErr) {
      console.error('Bcrypt error:', compareErr);
      res.status(500).json({ message: 'Server error' });
    }
  });
});

module.exports = router;

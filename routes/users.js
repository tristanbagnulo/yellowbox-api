// routes/users.js

const express = require('express');
const router = express.Router();
const { users } = require('../mockDatabase');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const rateLimit = require('../middleware/rateLimit');

// Middleware to handle versioning and rate limiting
router.use('/v1/users', rateLimit);

// Create a new user account
router.post('/v1/users/register', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
  
    // Check if the email is already registered
    const emailExists = Object.values(users).some((user) => user.email === email);
    if (emailExists) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
  
    const userId = uuidv4();
    const apiToken = uuidv4();
  
    try {
      // Hash the API token before storing
      const hashedToken = await bcrypt.hash(apiToken, 10);
  
      users[userId] = {
        userId,
        email,
        apiToken: hashedToken,
        createdAt: new Date(),
        status: 'active',
      };
  
      // Return the plain API token to the user
      res.status(201).json({ userId, apiToken });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

module.exports = router;

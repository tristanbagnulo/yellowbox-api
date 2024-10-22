// middleware/rateLimit.js

const rateLimit = require('express-rate-limit');

// Define rate limit: 100 requests per minute per API token
const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each API token to 100 requests per windowMs
  keyGenerator: (req) => {
    // Use the API token as the key
    return req.headers['authorization'] || req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded. Try again later.',
    });
  },
});

module.exports = apiRateLimiter;

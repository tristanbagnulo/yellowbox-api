// routes/lockers.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');
const { lockers } = require('../mockDatabase');

// Initialize some lockers
if (Object.keys(lockers).length === 0) {
    for (let i = 1; i <= 10; i++) {
      lockers[`locker${i}`] = {
        lockerId: `locker${i}`,
        status: 'available',
        currentUserId: null,
        bookingStart: null,
        bookingEnd: null,
        location: `Floor 1, Section ${String.fromCharCode(64 + i)}`, // Example locations
      };
    }
}

// Middleware to handle versioning and rate limiting
router.use('/v1/lockers', rateLimit);

// Open a specific locker
router.post('/v1/lockers/open/:lockerId', auth, async (req, res) => {
    const { lockerId } = req.params;
    const locker = lockers[lockerId];
  
    if (!locker) {
      return res.status(404).json({ error: 'Locker not found.' });
    }
  
    // Check if the locker is currently occupied
    if (locker.status !== 'occupied') {
        return res.status(400).json({ error: 'Locker is not currently booked.' });
    }

    // Check if the current user booked the locker
    if (locker.currentUserId !== req.user.userId) {
        return res.status(403).json({ error: 'You did not book this locker.' });
    }
    // Simulate opening the locker (e.g., send command to hardware)
    // For this example, we'll assume the operation is successful.
  
    res.status(200).json({ message: `Locker ${lockerId} opened successfully.` });
});

// Start a locker booking
router.post('/v1/lockers/book/start/:lockerId', auth, async (req, res) => {
    const { lockerId } = req.params;
    const locker = lockers[lockerId];
  
    if (!locker) {
      return res.status(404).json({ error: 'Locker not found.' });
    }
  
    if (locker.status === 'occupied') {
      return res.status(409).json({ error: 'Locker is already occupied.' });
    }
  
    locker.status = 'occupied';
    locker.currentUserId = req.user.userId;
    locker.bookingStart = new Date();
    locker.bookingEnd = null;
  
    res.status(200).json({ message: `Locker ${lockerId} booked successfully.` });
});

// End a locker booking
router.post('/v1/lockers/book/end/:lockerId', auth, async (req, res) => {
    const { lockerId } = req.params;
    const locker = lockers[lockerId];
  
    if (!locker) {
      return res.status(404).json({ error: 'Locker not found.' });
    }
  
    if (locker.currentUserId !== req.user.userId) {
      return res.status(403).json({ error: 'You did not book this locker.' });
    }
  
    locker.status = 'available';
    locker.currentUserId = null;
    locker.bookingEnd = new Date();
    locker.bookingStart = null;
  
    res.status(200).json({ message: `Locker ${lockerId} booking ended.` });
});

// Retrieve the status of a locker
router.get('/v1/lockers/status/:lockerId', auth, async (req, res) => {
    const { lockerId } = req.params;
    const locker = lockers[lockerId];
  
    if (!locker) {
      return res.status(404).json({ error: 'Locker not found.' });
    }
  
    res.status(200).json(locker);
});

module.exports = router;

// app.js

const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/users');
const lockerRoutes = require('./routes/lockers');

// Use the routes with the base path
app.use('/api', userRoutes);
app.use('/api', lockerRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

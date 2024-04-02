// app.js or index.js

const express = require('express');
const mongoose = require('mongoose');
const consultationRoutes = require('./Routes');

const app = express();

// Connect to MongoDB

// Middleware to parse JSON bodies
app.use(express.json());

// Use consultation routes
app.use('/api', consultationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

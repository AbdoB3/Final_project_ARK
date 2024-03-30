// app.js or index.js

const express = require('express');
const mongoose = require('mongoose');
const consultationRoutes = require('./rotes/ consultationRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myfinal')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Use consultation routes
app.use('/api', consultationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

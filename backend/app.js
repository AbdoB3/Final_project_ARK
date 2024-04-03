require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const consultationRoutes = require('./src/Routes/ consultationRoutes');

const app = express();

const uri = process.env.MONGODB_URI;
//connection a la base de donne
mongoose
    .connect(uri)

    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error)
    });

// Middleware to parse JSON bodies
app.use(express.json());

// Use consultation routes
app.use('/api', consultationRoutes);

// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

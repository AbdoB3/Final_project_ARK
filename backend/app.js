const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

//connection a la base de donne
mongoose
.connect(uri)

    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error)
    });

const postPatient = require('./routes/patientRoutes')
app.use('/patient',postPatient)
    
    

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});
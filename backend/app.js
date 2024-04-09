require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

port = process.env.PORT;
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
    

const postPatient = require('./src/Routes/patientRoutes')
app.use('/patient',postPatient)

const doctorRoutes = require('./src/Routes/doctorRoute');
app.use('/doctors', doctorRoutes);

const AdminRoutes = require("./src/Routes/AdminRoutes");
app.use('/admin', AdminRoutes);

const SpecialityRoutes = require("./src/Routes/SpecialityRoutes");
app.use('/speciality', SpecialityRoutes);
    
const consultationRoutes=require('./src/Routes/consultationRoutes');
app.use('/consultation',consultationRoutes);


app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

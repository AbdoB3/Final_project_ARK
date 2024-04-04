require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./src/Routes/doctorRoute');
const consultationRoutes=require('./src/Routes/ consultationRoutes');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
 port = process.env.PORT;
const uri = process.env.MONGODB_URI;

app.use('/doctors', doctorRoutes);

const AdminRoutes = require("./src/Routes/AdminRoutes");
app.use('/admin', AdminRoutes);

const SpecialityRoutes = require("./src/Routes/SpecialityRoutes");
app.use('/speciality', SpecialityRoutes);
    

    
//connection a la base de donne
mongoose
.connect(uri)

    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error)
    });


const postPatient = require('./src/Routes//patientRoutes')
    app.use('/patient',postPatient)
    
app.use('./consultation',consultationRoutes);

app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

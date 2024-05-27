require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// Connection to the database
mongoose
    .connect(uri)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error);
    });

const server = http.createServer(app);
/*const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', socket.id);
    });

    socket.on('offer', (roomId, description) => {
        socket.to(roomId).emit('offer', socket.id, description);
    });

    socket.on('answer', (roomId, description) => {
        socket.to(roomId).emit('answer', socket.id, description);
    });

    socket.on('candidate', (roomId, candidate) => {
        socket.to(roomId).emit('candidate', socket.id, candidate);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});
*/
// Import routes
const postPatient = require('./src/Routes/patientRoutes');
app.use('/patient', postPatient);

const doctorRoutes = require('./src/Routes/doctorRoute');
app.use('/doctors', doctorRoutes);

const AdminRoutes = require('./src/Routes/AdminRoutes');
app.use('/admin', AdminRoutes);

const SpecialityRoutes = require('./src/Routes/SpecialityRoutes');
app.use('/speciality', SpecialityRoutes);

const consultationRoutes = require('./src/Routes/consultationRoutes');
app.use('/consultation', consultationRoutes);

server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload'); // Middleware Multer 

const {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById,
    findDoctorsBySpeciality,profile,changeStatus } = require ('../Controllers/doctorController')

const {authenticateUser,authorize} = require('../middlewares/adminDocMiddleware');

    router.post('/', createDoctor);
    
    router.use(authenticateUser)

    router.get('/profile',profile);
    router.patch('/:id', authorize(['Admin']),changeStatus);
    router.get('/', authorize(['Admin']),getAllDoctors);
    router.get('/:id',getDoctorById);

   
    router.put('/:id',authorize(['Admin','Doctor']),updateDoctorById);
    router.delete('/:id', authorize(['Admin']),deleteDoctorById);
    
    router.get('/speciality/:speciality', findDoctorsBySpeciality);

    module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload'); // Middleware Multer 

const {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById,
    findDoctorsBySpeciality } = require ('../Controllers/doctorController')

const {authenticateUser,authorize} = require('../Middlewares/adminDocMiddleware');

    router.post('/', createDoctor);
    router.get('/',getAllDoctors);
    router.get('/speciality/:speciality', findDoctorsBySpeciality);

    router.use(authenticateUser)

    router.get('/', authorize(['admin']),getAllDoctors);
    router.get('/:id',getDoctorById);
   
    router.put('/:id',authorize(['admin','doctor']),updateDoctorById);
    router.delete('/:id', authorize(['admin']),deleteDoctorById);
    
    router.get('/speciality/:speciality', findDoctorsBySpeciality);

    module.exports = router;
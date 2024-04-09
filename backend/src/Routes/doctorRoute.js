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

    router.get('/', getAllDoctors);
    router.get('/:id',getDoctorById);
    router.post('/',upload.single('image'), createDoctor);
    router.put('/:id',upload.single('image'),updateDoctorById);
    router.delete('/:id', deleteDoctorById);
    router.get('/speciality/:speciality', findDoctorsBySpeciality);

    module.exports = router;
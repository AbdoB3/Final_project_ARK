const express = require('express');
const router = express.Router();


const {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById} = require ('../Controllers/doctorController')

    router.get('/', getAllDoctors);
    router.get('/:id',getDoctorById);
    router.post('/', createDoctor);
    router.put('/:id',updateDoctorById);
    router.delete('/:id', deleteDoctorById);
    
    module.exports = router;
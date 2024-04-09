const express = require('express');
const router = express.Router();

const {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById} = require ('../Controllers/doctorController')

const {authenticateUser,authorize} = require('../middlewares/adminDocMiddleware');

    router.post('/', createDoctor);

    router.use(authenticateUser)

    router.get('/', authorize(['admin']),getAllDoctors);
    router.get('/:id',getDoctorById);
   
    router.put('/:id',authorize(['admin','doctor']),updateDoctorById);
    router.delete('/:id', authorize(['admin']),deleteDoctorById);
    
    module.exports = router;
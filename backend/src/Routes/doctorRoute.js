const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload'); // Middleware Multer 

const {
    filterGender,
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById,
    findDoctorsBySpeciality,
    changeStatus, profile } = require('../Controllers/doctorController')
const { getSumPerDoctor } = require("../Controllers/sumController")
const { authenticateUser, authorize } = require('../Middlewares/adminDocMiddleware');

router.get('/', getAllDoctors);

router.get('/filter', filterGender);
router.get('/:id', getDoctorById);
router.get('/speciality/:speciality', findDoctorsBySpeciality);
router.post('/', createDoctor);
router.get('/sum/:doctorId', getSumPerDoctor);
//i added fileter path

router.use(authenticateUser);

router.get('/profile', profile);
router.patch('/:id', authorize(['Admin']), changeStatus);
//router.get('/', authorize(['Admin']),getAllDoctors);

router.get('/:id', getDoctorById);



router.put('/:id', authorize(['Admin', 'Doctor']), updateDoctorById);
router.delete('/:id', authorize(['Admin']), deleteDoctorById);


module.exports = router;
const express = require('express');
const { loginPatient } = require('../Controllers/authController');
const router = express.Router();

const { getAllPatient, getPatientById, createPatient, updatePatient, deletePatient } = require('../Controllers/patientController')
const {authenticateUser,authorize} = require('../Middlewares/adminDocMiddleware');

router.post('/login', loginPatient)
router.post('/', createPatient)


router.use(authenticateUser);

router.get('/', authorize(['admin']), getAllPatient)
router.get('/:id', getPatientById)


router.put('/:id', authorize(['admin','patient']), updatePatient)
router.delete('/:id', authorize(['admin']),deletePatient)



module.exports = router
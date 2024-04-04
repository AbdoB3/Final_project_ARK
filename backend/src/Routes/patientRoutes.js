const express = require('express');
const router = express.Router();

const { getAllPatient, getPatientById, createPatient, updatePatient, deletePatient } = require('../controllers/patientController')



router.get('/', getAllPatient)
router.get('/:id', getPatientById)

router.post('/', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)



module.exports = router
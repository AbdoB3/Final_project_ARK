const express = require('express');
const router= express.Router();

const {form,getMedicalFormByPatientId} = require('../Controllers/MedicalController');

router.post('/', form );
router.get( '/:patientId',getMedicalFormByPatientId)

module.exports = router;
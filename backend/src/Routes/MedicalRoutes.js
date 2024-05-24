const express = require('express');
const router= express.Router();

const {Form} = require('../Controllers/MedicalController');

router.post('/', Form );

module.exports = router;
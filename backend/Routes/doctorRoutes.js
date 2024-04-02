const express = require('express');
const router = express.Router();
const doctorController = require('../Controllers/doctorController');

router.post('/doctors', doctorController.createDoctor);


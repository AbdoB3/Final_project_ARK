const express = require('express');
const router = express.Router();
const consultationController = require('../Controllers/consultationController');

// Route to get all consultations
router.get('/', consultationController.getAllConsultations);

// :Route to create a new consultation
router.post('/', consultationController.createConsultation);

// Route to find a consultation by ID
router.get('/:id', consultationController.findConsultationById);

// Route to update a consultation by ID
router.put('/:id', consultationController.updateConsultation);

// Route to delete a consultation by ID
router.delete('/:id', consultationController.deleteConsultation);

module.exports = router;

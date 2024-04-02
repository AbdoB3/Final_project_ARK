const express = require('express');
const router = express.Router();
const consultationController = require('../Controllers/consultationController');

// Route to create a new consultation
router.post('/consultations', consultationController.createConsultation);

// Route to find a consultation by ID
router.get('/consultations/:id', consultationController.findConsultationById);

// Route to find consultations by price or all consultations if price is not provided
router.get('/consultations', consultationController.findConsultationsByPrice);

// Route to update a consultation by ID
router.put('/consultations/:id', consultationController.updateConsultation);

// Route to delete a consultation by ID
router.delete('/consultations/:id', consultationController.deleteConsultation);

module.exports = router;

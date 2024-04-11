const mongoose = require('mongoose');
const Consultation = require('../Models/consultation');

async function getAllConsultations(req, res) {
    try {
        const consultations = await Consultation.find();
        res.status(200).json(consultations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create a new consultation
async function createConsultation(req, res) {
    try {
        const { doctor_id, patient_id, date_consultation, motif_consultation, consultation_type } = req.body;
        const consultation = await Consultation.create({ doctor_id, patient_id, date_consultation, motif_consultation, consultation_type });
        res.status(201).json("Consultation added successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Find a consultation by ID
async function findConsultationById(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id);
        if (!consultation) {
            return res.status(404).json('Consultation not found');
        }
        res.json(consultation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a consultation by ID
async function updateConsultation(req, res) {
    try {
        const { id } = req.params;
        const { doctor_id, patient_id, date_consultation, motif_consultation, consultation_type } = req.body;
        const consultation = await Consultation.findByIdAndUpdate(id, { doctor_id, patient_id, date_consultation, motif_consultation, consultation_type }, { new: true });
        if (!consultation) {
            return res.status(404).json('Consultation not found');
        }
        res.json("Consultation updated successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a consultation by ID
async function deleteConsultation(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByIdAndDelete(id);
        if (!consultation) {
            return res.status(404).json('Consultation not found');
        }
        res.json("Consultation deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllConsultations,
    createConsultation,
    findConsultationById,
    updateConsultation,
    deleteConsultation
};

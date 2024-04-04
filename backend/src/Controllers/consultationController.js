const Consultation = require('../Models/consultation');



async function getAllConsultations(req, res) {
    try {
        const consultations = await Consultation.find();
        res.json({ success: true, data: consultations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Create a new consultation
async function createConsultation(req, res) {
    try {
        const { doctor_id, date_consultation, motif_consultation, prix } = req.body;
        const consultation = await Consultation.create({ doctor_id, date_consultation, motif_consultation, prix });
        const consultations = await Consultation.find();
        res.status(201).json({ success: true, message: "Consultation added successfully", data: consultations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Find a consultation by ID
async function findConsultationById(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id);
        if (!consultation) {
            return res.status(404).json({ success: false, error: 'Consultation not found' });
        }
        res.json({ success: true, data: consultation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Find consultations by price or all consultations if price is not provided
async function findConsultationsByPrice(req, res) {
    try {
        const { price } = req.query;
        const query = price ? { prix: price } : {};
        const consultations = await Consultation.find(query);
        res.json({ success: true, data: consultations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Update a consultation by ID
async function updateConsultation(req, res) {
    try {
        const { id } = req.params;
        const { doctor_id, date_consultation, motif_consultation, prix } = req.body;
        const consultation = await Consultation.findByIdAndUpdate(id, { doctor_id, date_consultation, motif_consultation, prix }, { new: true });
        if (!consultation) {
            return res.status(404).json({ success: false, error: 'Consultation not found' });
        }
        const consultations = await Consultation.find();
        res.json({ success: true, message: "Consultation updated successfully", data: consultations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Delete a consultation by ID
async function deleteConsultation(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByIdAndDelete(id);
        if (!consultation) {
            return res.status(404).json({ success: false, error: 'Consultation not found' });
        }
        const consultations = await Consultation.find();
        res.json({ success: true, message: "Consultation deleted successfully", data: consultations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    getAllConsultations,
    createConsultation,
    findConsultationById,
    findConsultationsByPrice,
    updateConsultation,
    deleteConsultation
};

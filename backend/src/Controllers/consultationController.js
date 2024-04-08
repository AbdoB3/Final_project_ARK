const Consultation = require('../Models/consultation');



async function getAllConsultations(req, res) {
    try {
        const consultations = await Consultation.find();
        res.json(  consultations );
    } catch (err) {
        res.status(500).json(  err.message );
    }
}

// Create a new consultation
async function createConsultation(req, res) {
    try {
        const { doctor_id, date_consultation, motif_consultation} = req.body;
        const consultation = await Consultation.create({ doctor_id, date_consultation, motif_consultation});
        const consultations = await Consultation.find();
        res.status(201).json({  message: "Consultation added successfully", consultations });
    } catch (err) {
        res.status(500).json(  err.message );
    }
}

// Find a consultation by ID
async function findConsultationById(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id);
        if (!consultation) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        res.json( consultation );
    } catch (err) {
        res.status(500).json(  err.message );
    }
}




// Update a consultation by ID
async function updateConsultation(req, res) {
    try {
        const { id } = req.params;
        const { doctor_id, date_consultation, motif_consultation} = req.body;
        const consultation = await Consultation.findByIdAndUpdate(id, { doctor_id, date_consultation, motif_consultation}, { new: true });
        if (!consultation) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        const consultations = await Consultation.find();
        res.json({  message: "Consultation updated successfully",  consultations });
    } catch (err) {
        res.status(500).json(  err.message );
    }
}

// Delete a consultation by ID
async function deleteConsultation(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByIdAndDelete(id);
        if (!consultation) {
            return res.status(404).json({ error: 'Consultation not found' });
        }
        const consultations = await Consultation.find();
        res.json({ message: "Consultation deleted successfully",  consultations });
    } catch (err) {
        res.status(500).json(  err.message );
    }
}
async function getAllConsultationsdocors(req, res) {
    try {
        const consultations = await Consultation.find().populate('doctor_id');
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllConsultations,
    createConsultation,
    findConsultationById,
    updateConsultation,
    deleteConsultation, getAllConsultationsdocors
};

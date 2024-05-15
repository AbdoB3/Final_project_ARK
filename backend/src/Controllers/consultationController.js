const Consultation = require('../Models/consultation');


async function getAllConsultations(req, res) {
    try{
        const consultation= await Consultation.find();
        res.status(200).send(consultation);
    } catch (err) {
        res.status(500).json(err. erressage );
    }
}

// Create a new consultation
async function createConsultation(req, res) {
    try {
        const { doctor_id, patient_id, date_consultation, motif_consultation} = req.body;
        const consultation = await Consultation.create({ doctor_id, patient_id, date_consultation, motif_consultation});
        res.status(201).json("Consultation added successfully");
    } catch (err) {
        res.status(500).json(err.message);
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
        res.status(500).json(err.message);
    }
}

async function findConsultationsByDoctorId(req, res) {
    try {
        const { doctorId } = req.params; 
        const consultations = await Consultation.find({ doctor_id: doctorId }); 
        res.json(consultations); 
    } catch (err) {
        res.status(500).json(err.message); 
    }
}

// Update a consultation by ID
async function updateConsultation(req, res) {
    try {
        const { id } = req.params;
        const { doctor_id, patient_id, date_consultation, motif_consultation} = req.body;
        const consultation = await Consultation.findByIdAndUpdate(id, { doctor_id, patient_id, date_consultation, motif_consultation}, { new: true });
        if (!consultation) {
            return res.status(404).json('Consultation not found');
        }
        res.json("Consultation updated successfully");
    } catch (err) {
        res.status(500).json(err.message);
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
        res.status(500).json(err.message);
    }
}

module.exports = {
    getAllConsultations,
    createConsultation,
    findConsultationById,
    updateConsultation,
    deleteConsultation,
    findConsultationsByDoctorId
};
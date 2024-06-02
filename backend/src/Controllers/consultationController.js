const Consultation = require('../Models/consultation');

// Create a new consultation
const createConsultation = async (req, res) => {
  try {
    const { doctor_id, patient_id, date_consultation, time, motif_consultation, consultation_type, message, price } = req.body;

    // Check if all required fields are provided
    if (!doctor_id || !patient_id || !date_consultation || !time || !motif_consultation || !consultation_type || !message) {
      return res.status(400).json({ error: 'All fields except price are required' });
    }
}


  

async function findConsultationById(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.json(consultation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function findConsultationsByDoctorId(req, res) {
    try {
        const { doctorId } = req.params; 
        const consultations = await Consultation.find({ doctor_id: doctorId }); 
        res.json(consultations); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateConsultation(req, res) {
    try {
        const { id } = req.params;
        const { doctor_id, patient_id, date_consultation, motif_consultation, consultation_type, price } = req.body;
        const consultation = await Consultation.findByIdAndUpdate(id, { doctor_id, patient_id, date_consultation, motif_consultation, consultation_type, price }, { new: true });
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.json({ message: "Consultation updated successfully", consultation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteConsultation(req, res) {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByIdAndDelete(id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.json({ message: "Consultation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation
};

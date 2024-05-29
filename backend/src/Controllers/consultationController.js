const Consultation = require('../Models/consultation');

async function getAllConsultations(req, res) {
    try {
        const consultations = await Consultation.find();
        res.status(200).json(consultations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createConsultation = async (req, res) => {
    try {
      const { doctor_id, patient_id, date_consultation,
         motif_consultation, consultation_type, price } = req.body;
        
      const consultation = await Consultation.create({
        doctor_id,
        patient_id,
        date_consultation,
        motif_consultation,
        consultation_type,
        price,
      });
  
      res.status(201).json({ message: "Consultation booked successfully", consultation });
    } catch (err) {
      console.error('Error booking consultation:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
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
const deleteConsultation = async (req, res) => {
    try {
      const { id } = req.params;
  
      const consultation = await Consultation.findByPk(id);
  
      if (!consultation) {
        return res.status(404).json({ error: 'Consultation not found' });
      }
  
      await consultation.destroy();
      res.status(200).json({ message: 'Consultation deleted successfully' });
    } catch (err) {
      console.error('Error deleting consultation:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {
    getAllConsultations,
    createConsultation,
    findConsultationById,
    updateConsultation,
    deleteConsultation,
    findConsultationsByDoctorId
};

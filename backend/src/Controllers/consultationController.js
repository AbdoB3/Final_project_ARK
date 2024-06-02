const Consultation = require('../Models/consultation');

// Create a new consultation
const createConsultation = async (req, res) => {
  try {
    const { doctor_id, patient_id, date_consultation, time, motif_consultation, consultation_type, message, price } = req.body;

    // Check if all required fields are provided
    if (!doctor_id || !patient_id || !date_consultation || !time || !motif_consultation || !consultation_type || !message) {
      return res.status(400).json({ error: 'All fields except price are required' });
    }

    // Create a new consultation
    const newConsultation = new Consultation({
      doctor_id,
      patient_id,
      date_consultation,
      time,
      motif_consultation,
      consultation_type,
      message,
      price
    });

    // Save the consultation to the database
    const savedConsultation = await newConsultation.save();

    res.status(201).json(savedConsultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all consultations
const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().populate('doctor_id').populate('patient_id');
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single consultation by ID
const getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await Consultation.findById(id).populate('doctor_id').populate('patient_id');
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a consultation by ID
const updateConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const consultation = await Consultation.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a consultation by ID
const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await Consultation.findByIdAndDelete(id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    res.status(200).json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation
};

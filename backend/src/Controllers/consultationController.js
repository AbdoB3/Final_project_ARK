const Consultation = require('../Models/consultation');

// Get all consultations
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().populate('doctor_id').populate('patient_id');
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new consultation
exports.createConsultation = async (req, res) => {
  const { doctor_id, patient_id, date_consultation, time, motif_consultation, price, consultation_type } = req.body;

  const newConsultation = new Consultation({
    doctor_id,
    patient_id,
    date_consultation,
    time,
    motif_consultation,
    price,
    consultation_type
  });

  try {
    const savedConsultation = await newConsultation.save();
    res.status(201).json(savedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a consultation by ID
exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).populate('doctor_id').populate('patient_id');
    if (consultation == null) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find consultations by doctor ID
exports.findConsultationsByDoctorId = async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctor_id: req.params.doctorId }).populate('doctor_id').populate('patient_id');
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a consultation by ID
exports.updateConsultation = async (req, res) => {
  try {
    const updatedConsultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedConsultation == null) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json(updatedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a consultation by ID
exports.deleteConsultation = async (req, res) => {
  try {
    const deletedConsultation = await Consultation.findByIdAndDelete(req.params.id);
    if (deletedConsultation == null) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json({ message: 'Consultation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get consultations by patient ID
exports.patientConsultation = async (req, res) => {
  try {
    const consultations = await Consultation.find({ patient_id: req.params.patientId })
      .populate({
        path: 'doctor_id',
        select: 'firstname lastname'
      });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consultations', error });
  }
};


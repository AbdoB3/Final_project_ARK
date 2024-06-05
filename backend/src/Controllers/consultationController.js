const Consultation = require('../Models/consultation');
const Patient = require('../Models/Patients');


async function getAllConsultations(req, res) {
    try{
        const consultation= await Consultation.find();
        res.status(200).send(consultation);
    } catch (err) {
        res.status(500).json(err. erressage );
    }
}


// Create a new consultation
async function createConsultation (req, res) {
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

async function patientConsultation  (req, res) {
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

async function findConsultationsByDoctorId(req, res) {
    try {
        const { doctorId } = req.params; 
        const consultations = await Consultation.find({ doctor_id: doctorId }); 
        res.json(consultations); 
    } catch (err) {
        res.status(500).json(err.message); 
    }
}

async function getPatientsPerDoctor(req, res) {
    try {
        const { doctorId } = req.params; 
        const consultations = await Consultation.find({ doctor_id: doctorId },{patient_id:1,_id:0});
        const patientIds = consultations.map(consultation => consultation.patient_id);
  
        const patients = await Patient.find({ _id: { $in: patientIds } })      
        res.json(patients); 
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
    findConsultationsByDoctorId,
    getPatientsPerDoctor,
    patientConsultation
};
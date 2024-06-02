const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true },
    time: { type: String, required: true },
    motif_consultation: { type: [String], required: true },
    consultation_type: { type: String, enum: ['presential', 'online'], default: 'online' },
    message: { type: String, required: true },
    price: { type: Number, required: false }
});

const Consultation = mongoose.model('Consultation', consultationSchema); 
module.exports = Consultation;

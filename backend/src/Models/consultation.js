const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true },
  date_consultation: { type: Date, required: true },
  time: { type: String, required: true }, // Add a field for time
  motif_consultation: { type: [String], required: true },
  price: { type: Number, required: true },
  consultation_type: { type: String, enum: ['presential', 'online'], default: 'online' }
});

const Consultation = mongoose.model('Consultation', consultationSchema);
module.exports = Consultation;

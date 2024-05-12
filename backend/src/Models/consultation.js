const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true },
    date_consultation: { type: Date, required: true },
    motif_consultation: String,
    price:{type:Number,require:true},
    consultation_type: { type: String, enum: ['presential', 'online'], default: 'presential' }

});

const Consultation = mongoose.model('Consultation', consultationSchema); 
module.exports = Consultation;

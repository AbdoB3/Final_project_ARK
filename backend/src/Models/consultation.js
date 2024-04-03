const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: '', required: true },
    date_consultation: { type: Date, required: true },
    motif_consultation: String,

    prix: {
        type: Number,
        required: true
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;

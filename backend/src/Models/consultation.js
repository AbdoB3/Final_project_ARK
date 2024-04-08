const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date_consultation: { type: Date, required: true },
    motif_consultation: String,

});

consultationSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'doctor_id', 
        select: 'firstname lastname  email phone sexe adress feePer:' 
        
    });
    next();
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;

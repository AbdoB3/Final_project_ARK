const mongoose = require('mongoose');


const patientSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    adresse: { type: String, required: true },
    location: {
        city: String,
        state: String,
        country: String
    },
    sexe: { type: String, required: true },
    date_nais: { type: String, required: true },
    email : { type: String, required: true }

},
    { timestamps: true }
);

const Patient = mongoose.model('patient', patientSchema);



module.exports = Patient;
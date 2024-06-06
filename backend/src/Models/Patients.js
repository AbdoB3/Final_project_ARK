const mongoose = require('mongoose');


const patientSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    city: { type: String, required: false },
    location: {
        city: String,
        state: String,
        country: String
    },
    sexe: { type: String, required: false },
    date_nais: { type: String, required: false },
    email : { type: String, required: true }

},
    { timestamps: true }
);

const Patient = mongoose.model('patient', patientSchema);



module.exports = Patient;
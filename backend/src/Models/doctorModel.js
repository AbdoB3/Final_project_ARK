const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    description: { type: String, required: false },
    email :{type: String, required: true },
    password :{type: String},
    phone :{type: String},
    sexe: { type: String, enum: ['homme', 'femme']},
    address: {city: String,state: String,country: String},
    speciality: { type: String },
    experience: { type: String }, 
    feePer:{type: Number},
    imageUrl:{type: String},
    fromTime:{type: String , required: false},    
    toTime:{type: String  , required: false},
    state:{type: String, default:"pending"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
 
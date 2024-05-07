const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email :{type: String, required: true },
    password :{type: String},
    phone :{type: String, required: false },
    sexe: { type: String, enum: ['homme', 'femme']},
    address: {city: String,state: String,country: String},
    speciality: { type: String },
    experience: { type: String }, 
    feePer:{type: Number},
    imageUrl:{ype: String},
    fromTime:{type: String},
    toTime:{type: String},
    state:{type: String,default:"pending"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
 
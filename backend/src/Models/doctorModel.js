const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email :{type: String, required: true },
    password :{type: String},
    phone :{type: String, required: true },
    sexe: { type: String },
    adress: {city: String,state: String,country: String},
    speciality: { type: String, required: true }, 
    experience: { type: String }, 
    feePer:{type: Number},
    imageUrl:{ype: String},
    fromTime:{type: String},
    toTime:{type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
 
const mongoose = require('mongoose');

const SpecialitySchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
});

const Speciality = mongoose.model('Speciality', SpecialitySchema);

module.exports = Speciality;

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    identifiant: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

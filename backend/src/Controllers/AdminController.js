const Admin = require('../Models/AdminModel');
const bcrypt = require('bcrypt');

// GET all admins
async function GetAllAdmins(req, res) {
    try {
        const admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const AdminById = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
        res.json(admin)
    } else {
        const err = new Error('Admin not found');
        next(err)
    }
};


// CREATE new admin
async function CreateAdmin(req, res) {

    let { nom, prenom, email, identifiant, password } = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        let admin = new Admin({ nom, prenom, email, identifiant, password: hashedpassword });
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        // res.status(400).json({ message: err.message });
        console.error('Error:', err.message);
    }
};

// UPDATE admin by ID
async function UpdateAdmin(req, res) {
    try {
        let { id } = req.params;
        let { nom, prenom, identifiant, mot_de_passe } = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(id, { nom, prenom, identifiant, mot_de_passe }, { new: true });
        res.json(updatedAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE admin by ID
async function DeleteAdmin(req, res) {
    try {
        const deleted = await Admin.findByIdAndDelete(req.params.id);

        res.json({ message: 'Admin deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { GetAllAdmins, AdminById, CreateAdmin, UpdateAdmin, DeleteAdmin } 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Patient = require('../Models/Patients')
const Admin = require('../Models/AdminModel')
const Doctor = require('../Models/doctorModel')


const loginPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ email: req.body.email });

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        const match = await bcrypt.compare(req.body.password, patient.password);

        if (!match) {
            return res.status(401).send('Incorrect password');
        }

        const token = jwt.sign({ userId: patient._id, role: 'patient' }, 'secret_key', { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const adMed = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        const doctor = await Doctor.findOne({ email: req.body.email });

        if (!admin && !doctor) {
            return res.status(401).send('Incorrect email or password');
        }

        let user;
        let userType;

        if (admin) {
            user = admin;
            userType = 'admin';
        } else {
            user = doctor;
            userType = 'doctor';
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).send(`Incorrect ${userType} password`);
        }

        const token = jwt.sign({ userId: user._id, role: userType }, 'secret_key', { expiresIn: '24h' });

        return res.send(`Welcome to the ${userType} dashboard with token : ${token}`);



    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { loginPatient, adMed }
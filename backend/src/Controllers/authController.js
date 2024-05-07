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
        const doctor = await Doctor.findOne({ email: req.body.email }); 

        if (doctor) {
            const match = await bcrypt.compare(req.body.password, doctor.password);

            if (!match) {
                return res.status(401).send('Incorrect doctor password');
            }

            const token = jwt.sign({ userId: doctor._id, role: 'doctor' }, 'secret_key', { expiresIn: '24h' });
            return res.send(`Welcome to the doctor dashboard with token : ${token}`);
        }

        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(401).send('Incorrect email or password');
        }

        const match = await bcrypt.compare(req.body.password, admin.password);

        if (!match) {
            return res.status(401).send('Incorrect admin password');
        }

        const token = jwt.sign({ userId: admin._id, role: 'admin' }, 'secret_key', { expiresIn: '24h' });
        return res.send(token);

    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}



module.exports = { loginPatient, adMed }
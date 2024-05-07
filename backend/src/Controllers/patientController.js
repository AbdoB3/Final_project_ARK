
const Patient = require('../Models/Patients')
const Doctor = require('../Models/doctorModel')
const bcrypt = require('bcrypt');


const getAllPatient = (req, res) => {
    Patient.find()
        .then(users => res.json(users))
        .catch(err => console.log('error ', err))
};

const getPatientById = async (req, res, next) => {
    let patientById = await Patient.findById(req.params.id)
    if (patientById) {
        res.json(patientById)
    } else {
        const err = new Error('Patient not found');
        next(err)
    }
};

const createPatient = async (req, res) => {
    let { firstName, lastName, phone, password, adresse, location, sexe, date_nais, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let patient = new Patient({ firstName, lastName, phone, password: hashedPassword, adresse, location, sexe, date_nais, email })
    try {
        let savedPatient = await patient.save()
        res.send(savedPatient)
    } catch (e) { res.send(e.message) }
};

const updatePatient = async (req, res, next) => {
    const id = req.params.id;
    let { firstName, lastName, phone, email, sexe, adresse, location, date_nais, password, } = req.body;
    try {
        let updatedPatient = await Patient.findOneAndUpdate({ _id: id }, { firstName, lastName, phone, email,sexe })
        if (!updatedPatient) {
            return res.status(404).json('Patient not found')
        }
        res.status(200).send(updatedPatient);
    } catch {
        const err = new Error('Patient not found');
        next(err)
    }
};

const deletePatient = async (req, res, next) => {
    let id = req.params.id;
    let patient = await Patient.findByIdAndDelete(id)
    if (!patient) {
        return res.status(404).json('post not found')
    }
    res.send('Deleted successfuly');
};

let patientDoc = async (req, res) => {
    const { doctorId, patientId } = req.params;
    try {
        let patient = await Patient.findById(patientId)
        let doctor = await Doctor.findById(doctorId)
        if (!patient || !doctor) {
            return res.status(404).json('Patient or Doctor not found')
        }

        res.json({ patName: patient.firstName + " " + patient.lastName, docName: doctor.firstname + " " + doctor.lastname })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getAllPatient, getPatientById, createPatient, updatePatient, deletePatient, patientDoc }
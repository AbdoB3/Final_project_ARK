
const jwt = require('jsonwebtoken');
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
    console.log(req.body);
    let { firstName, lastName, phone, password, city, location, sexe, date_nais, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let patientInfo = new Patient({ firstName, lastName, phone, password: hashedPassword, city, location, sexe, date_nais, email });
console.log(patientInfo)
    // Create token
    const token = jwt.sign({ userId: patientInfo._id, role: 'patient' }, 'secret_key', { expiresIn: '24h' });

    try {
        // Save patientInfo to the database
        let savedPatient = await patientInfo.save();

        // Send the token along with the saved patient info
        res.json({ patient: savedPatient, token });
    } catch (e) {
        res.status(500).send(e.message);
    }
};

/*
const createPatient = async (req, res) => {
    let { firstName, lastName, phone, password, adresse, location, sexe, date_nais, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let patient = new Patient({ firstName, lastName, phone,
         password: hashedPassword, adresse, location, sexe, date_nais, email })
    try {

        let savedPatient = await patient.save()
        res.send(savedPatient)
    } catch (e) { res.send(e.message) }
};
*/
const updatePatient = async (req, res, next) => {
    const id = req.params.id;
    let { firstName, lastName, phone, email, sexe, city, location, date_nais, password, } = req.body;
    try {
        let updatedPatient = await Patient.findOneAndUpdate({ _id: id }, { firstName, lastName, phone, email, sexe,city })
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
        if (!patient && !doctor) {
            return res.status(404).json('Patient or Doctor not found')
        }
        res.json({ patName: patient ? patient.firstName + " " + patient.lastName : "", docName: doctor ? doctor.firstname + " " + doctor.lastname : "" })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPatientsByIds = async (req, res, next) => {
    try {
      const ids = req.query.ids;
  
      if (!ids) {
        return res.status(400).json({ message: "Invalid input: 'ids' query parameter is required." });
      }
      // Split the ids string into an array
      const idsArray = ids.split(',');
  
      // Fetch patients whose IDs are in the array
      const patients = await Patient.find({ _id: { $in: idsArray } });
  
      if (patients.length > 0) {
        res.json(patients);
      } else {
        const err = new Error('No patients found for the provided IDs');
        err.status = 404;
        next(err);
      }
    } catch (error) {
      console.error('Error fetching patients by IDs:', error);
      next(error);
    }
  };
  

module.exports = { getAllPatient, getPatientById, createPatient, updatePatient, deletePatient, patientDoc,getPatientsByIds }
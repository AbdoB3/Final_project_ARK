
const Patient = require('../Models/Patients')



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
        const err = new Error('post not found');
        next(err)
    }
};

const createPatient = async (req, res) => {
    let { firstName, lastName, adresse, sexe, date_nais, password } = req.body;
    let patient = new Patient({ firstName, lastName, adresse, sexe, date_nais, password })
    try {
        let savedPatient = await patient.save()
        res.send(savedPatient)
    } catch (e) { res.send(e.message) }
};

const updatePatient = async (req, res, next) => {
    const id = req.params.id;

    let { firstName, lastName, adresse, sexe, date_nais, password } = req.body;
    try {
        let updatedPatient = await Patient.findOneAndUpdate({ _id: id }, { firstName, lastName, adresse, sexe, date_nais, password })
        if (!updatedPatient) {
            return res.status(404).json('post not found')
        }

        res.send(updatedPatient);
    } catch {
        const err = new Error('post not found');
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

module.exports = { getAllPatient, getPatientById, createPatient, updatePatient, deletePatient }

const Patient = require('../Models/Patients')
const Doctor = require('../Models/doctorModel')
const Consultation = require('../Models/consultation');

const getSum = async (req, res, next) => {
    let sumPatient = await Patient.countDocuments({})
    let sumDoctor = await Doctor.countDocuments({})
    let sumConsultation = await Consultation.countDocuments({})
    res.json({ sumPatient, sumDoctor, sumConsultation })

};

module.exports = {
    getSum
};
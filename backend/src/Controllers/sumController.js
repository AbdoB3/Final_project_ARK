
const mongoose = require('mongoose');

const Patient = require('../Models/Patients')
const Doctor = require('../Models/doctorModel')
const Consultation = require('../Models/consultation');

const getSum = async (req, res, next) => {
    let sumPatient = await Patient.countDocuments({})
    let sumDoctor = await Doctor.countDocuments({})
    let sumConsultation = await Consultation.countDocuments({})
    // Utiliser l'agrégation pour calculer la somme totale des prix dans consultations
    let result = await Consultation.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$price" }
            }
        }
    ]);

    // Si aucune consultation n'existe, result sera un tableau vide
    let total = result.length > 0 ? result[0].total : 0;

    res.json({ sumPatient, sumDoctor, sumConsultation , result:total})

};

const getSumPerDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params; 
        const objectId = new mongoose.Types.ObjectId(doctorId);

        const sumPatient = await Consultation.countDocuments({ doctor_id: objectId },{patient_id:1,_id:0});

        const sumConsultation = await Consultation.countDocuments({ doctor_id: objectId });


        // Using aggregation to sum the prices
        const result = await Consultation.aggregate([
            { $match: { doctor_id: objectId } },  // Match consultations with the given doctorId
            { $group: { _id: null, total: { $sum: "$price" } } }  // Sum the prices
        ]);

        // Extract the total from the aggregation result
        const total = result.length > 0 ? result[0].total : 0;

        res.json({result:total,sumPatient,sumConsultation} );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getSum,
    getSumPerDoctor
};
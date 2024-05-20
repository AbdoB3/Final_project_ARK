const Doctor = require('../Models/doctorModel');
const bcrypt = require('bcrypt');
const Speciality = require('../Models/SpecialityModel');
const cloudinary = require('cloudinary').v2;

// Configuration de Cloudinary
cloudinary.config({
    cloud_name: 'doagzivng',
    api_key: '957169358269159',
    api_secret: 'atpEPaSFXm25g4yb3khVLGJn51E'
});

// Fonction pour télécharger une image sur Cloudinary
const uploadImageToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
    } catch (error) {
        throw new Error('Error uploading image to Cloudinary');
    }
};

const filterGender = async (req, res) => {
    try {
        const { gender, speciality, page = 1, limit = 5 } = req.query;
        let query = {};
        if (gender) {
            query.sexe = gender;
        }
        if (speciality) {
            query.speciality = speciality;
        }
        const doctors = await Doctor.find(query);
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Profile
const profile = async (req, res) => {
    const id = req.idU;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            res.status(404).send('Doctor not Found')
        } else {
            res.status(200).json(doctor);
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
};

// Function to fetch specialities
const getSpecialities = async () => {
    try {
        return await Speciality.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// get all Doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        const specialities = await getSpecialities();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a Doctor
const createDoctor = async (req, res) => {
    const { firstname, lastname, email, password, description, phone, sexe, address,
        speciality, experience, feePer, fromTime, toTime } = req.body;

    if (sexe !== 'homme' && sexe !== 'femme') {
        return res.status(400).send('Invalid value for sex');
    }
    try {
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(400).send('Speciality does not exist');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            firstname, lastname, email, description, password: hashedPassword, phone, sexe, address,
            speciality: existingSpeciality.nom, experience, feePer,
            imageUrl: req.file ? await uploadImageToCloudinary(req.file) : null,
            fromTime, toTime
        });
        const savedDoctor = await newDoctor.save();
        res.status(201).send({ savedDoctor, speciality: existingSpeciality.nom });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            res.status(404).send('Doctor not Found');
        } else {
            res.status(200).send(doctor);
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};

// Update Doctor by ID
const updateDoctorById = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, description, email, password, phone,
        sexe, address, speciality, experience, feePer, fromTime, toTime } = req.body;

    if (sexe !== 'homme' && sexe !== 'femme') {
        return res.status(400).send('Invalid value for sex');
    }

    try {
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(400).send('Speciality does not exist');
        }

        const updateFields = {
            firstname, lastname, email, phone, sexe, address, description,
            speciality: existingSpeciality.nom, experience, feePer,
            imageUrl: req.file ? await uploadImageToCloudinary(req.file) : req.body.imageUrl,
            fromTime, toTime
        };

        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedDoctor) {
            return res.status(404).send('Doctor not found');
        }
        res.status(200).send(updatedDoctor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete Doctor by ID
const deleteDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDoctor = await Doctor.findByIdAndDelete(id);
        if (!deleteDoctor) {
            res.status(404).send('Doctor not found');
        } else {
            res.status(200).send('Doctor deleted successfully');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const findDoctorsBySpeciality = async (req, res) => {
    const { speciality } = req.params;
    try {
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(404).send('Speciality not found');
        }

        const doctors = await Doctor.find({ speciality: existingSpeciality.nom });
        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        await doctor.updateOne({ state }); // Assuming `state` is the field you want to update
        res.status(200).send('Doctor status updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    filterGender,
    profile,
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById,
    findDoctorsBySpeciality,
    changeStatus
}
const Doctor = require('../Models/doctorModel');
const bcrypt = require('bcrypt');
const Speciality = require('../Models/SpecialityModel');
//const multer = require('multer');
//const cloudinary = require('cloudinary').v2; 



/*Configuration de Cloudinary
cloudinary.config({
    cloud_name: 'doagzivng',
    api_key: '957169358269159',
    api_secret: 'atpEPaSFXm25g4yb3khVLGJn51E'
  });
  
  // Fonction pour télécharger une image sur Cloudinary
  const uploadImageToCloudinary = async (file) => {
    try {
      console.log("File path:", file.path); // Log file path for debugging
      const result = await cloudinary.uploader.upload(file.path);
      console.log("Cloudinary upload result:", result); // Log Cloudinary upload result
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error); // Log upload error
      throw new Error('Error uploading image to Cloudinary');
    }
  }

*/


// Profile

const profile = async(req,res) =>{
    const id = req.idU;
    console.log('id connected from token',id)
    try{
        const doctor = await Doctor.findById(id);
        if(!doctor){
            res.status(404).send('Doctor not Found')
        }else{
            res.status(200).json(doctor);
        }
    }catch(error){
        res.status(500).send('Error: ' + error.message)
    }
};


// Function to fetch specialities
const getSpecialities = async () => {
    try {
        const specialities = await Speciality.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// get all Doctors:
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
    const { firstname, lastname, email, password, phone, sexe, address, speciality, experience, feePer, imageUrl, fromTime, toTime } = req.body;

    // Télécharger l'image sur Cloudinary

    if (sexe !== 'homme' && sexe !== 'femme') {
        return res.status(400).send('Invalid value for sex');
    }
    try {
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(400).send('Speciality does not exist');
        }
        //const imageUrl = await uploadImageToCloudinary(req.file);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ firstname, lastname, email, password: hashedPassword, phone, sexe, address, speciality: existingSpeciality.nom, experience, feePer, imageUrl, fromTime, toTime });
        const savedDoctor = await newDoctor.save();
        const specialityName = existingSpeciality.nom;

        res.status(201).send({ savedDoctor, speciality: specialityName });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// get DoctorById

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            res.status(404).send('Doctor not Found')
        } else {
            res.status(200).send(doctor);
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
};



const updateDoctorById = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, password, phone, sexe, address, speciality, experience, feePer,fromTime, toTime,imageUrl } = req.body;
    const { city, country, state } = address;

    if (sexe !== 'homme' && sexe !== 'femme') {
        return res.status(400).send('Invalid value for sex');
    }


    try {
        // Vérifiez si la spécialité existe
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(400).send('Speciality does not exist');
        }
        //const imageUrl = await uploadImageToCloudinary(req.file);

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {
            firstname,
            lastname,
            email,
            password,
            phone,
            sexe,
            address,
            speciality: existingSpeciality.nom,
            experience,
            feePer,
            imageUrl,
            fromTime,
            toTime,
            
        }, { new: true });

        if (!updatedDoctor) {
            return res.status(404).send('Doctor not found');
        }
        await Doctor.findByIdAndUpdate(id, { imageUrl }, { new: true });

        res.status(200).send({ updatedDoctor });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// Delete DoctorById
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
        // Trouver l'ID de la spécialité correspondante
        const existingSpeciality = await Speciality.findOne({ nom: speciality });
        if (!existingSpeciality) {
            return res.status(404).send('Speciality not found');
        }

        // Recherche des médecins par spécialité
        const doctors = await Doctor.find({ speciality: existingSpeciality.nom });

        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

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
    profile,
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById,
    findDoctorsBySpeciality,
    changeStatus

}


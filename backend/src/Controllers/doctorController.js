const Doctor = require('../Models/doctorModel');
const bcrypt = require('bcrypt');


// get all Doctors :

const getAllDoctors = async(req,res) =>{
    try{
        const doctor = await Doctor.find();
        res.status(200).send(doctor);
    }catch (error){
        res.status(500).send(error.message);
    }
};

// get DoctorById

const getDoctorById = async(req,res) =>{
    const {id} = req.params;
    try{
        const doctor = await Doctor.findById(id);
        if(!doctor){
            res.status(404).send('Doctor not Found')
        }else{
            res.status(200).send(doctor);
        }
    }catch(error){
        res.status(500).send('Error: ' + error.message)
    }
};
//const speciality= require('../')
// Create a Doctor 
const createDoctor = async(req, res)=>{
    const { firstname, lastname, email, password, phone, sexe, address, speciality, experience, feePer, imageUrl, fromTime, toTime } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({firstname,lastname,email,password:hashedPassword,phone,sexe,address,speciality,experience,feePer,imageUrl,fromTime,toTime});
        const saveDoctor= await newDoctor.save();
        res.status(201).send(saveDoctor)
    }catch(error){
        res.status(400).send(error.message)
        
    }
}


// Update DoctorById
const updateDoctorById = async(req, res) =>{
    const {id} = req.params;
    const { firstname, lastname, email,password, phone, sexe, address, speciality, experience, feePer, imageUrl, fromTime, toTime } = req.body;

    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(id,{ firstname, lastname, email,password, phone, sexe, address, speciality, experience, feePer, imageUrl, fromTime, toTime }, {new : true});
        if(!updateDoctor){
            return res.status(404).send('Doctor not found');
        }
        res.status(200).send(updateDoctor);
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




module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById

}


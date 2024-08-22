const MedicalForm = require('../Models/MedicalModel');
 
async function getMedicalFormByPatientId(req, res) {
  const patientId = req.params.patientId; // Assuming patientId is passed as a URL parameter
  
  try {
    // Retrieve medical forms for the given patient ID
    const medicalForms = await MedicalForm.find({ patientId: patientId });

    // Check if any medical forms were found
    if (medicalForms.length === 0) {
      return res.status(404).json({ message: 'No medical forms found for the specified patient ID.' });
    }

    // Return the medical forms
    res.json(medicalForms);
  } catch (error) {
    console.error('Error retrieving medical forms:', error);
    res.status(500).json({ message: 'Internal server error. Failed to retrieve medical forms.' });
  }
}



 async function form (req, res) {
    try {
      const formData = new MedicalForm(req.body);
      await formData.save();
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Failed to submit the form. Please try again.' });
    }
  };

  module.exports = {form,getMedicalFormByPatientId} ;

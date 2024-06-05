const MedicalForm = require('../Models/MedicalModel');
 
 async function Form (req, res) {
    try {
      const formData = new MedicalForm(req.body);
      await formData.save();
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Failed to submit the form. Please try again.' });
    }
  };

  module.exports = {Form} ;
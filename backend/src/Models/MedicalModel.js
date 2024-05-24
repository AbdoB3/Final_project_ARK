const mongoose = require('mongoose');

const MedicalFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: [String],
    required: true,
  },
  allergies: {
    type: [String],
    required: true,
  },
  other_allergies: {
    type: String,
    required: function() { return this.allergies.includes("Other"); },
  },
  operations: {
    type: [String],
    required: true,
  },
  other_operations: {
    type: String,
    required: function() { return this.operations.includes("Other"); },
  },
  medications: {
    type: [String],
    required: true,
  },
  other_medications: {
    type: String,
    required: function() { return this.medications.includes("Other"); },
  },
  diseases: {
    type: [String],
    required: true,
  },
  other_diseases: {
    type: String,
    required: function() { return this.diseases.includes("Other"); },
  },
}, {
  timestamps: true,
});

const MedicalForm = mongoose.model('MedicalForm', MedicalFormSchema);

module.exports = MedicalForm;

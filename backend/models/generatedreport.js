const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  intern_id: String,
  course_id: String,
  generated_report: String,

});





// Create a model from the schema
const Generatereport = mongoose.model('Generatereport', userSchema);

module.exports = Generatereport ;

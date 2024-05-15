const mongoose = require('mongoose');

// Define a schema for your data
const InternSchema = new mongoose.Schema({
  // Inter_id: String,
  Inter_id: {type: mongoose.Schema.Types.ObjectId, ref: 'logindata', required: true},
  Name: String,
  Gender: String,
  Dob: String,
  Email: String,
  Phone: String,
  Photo: String,
  State: String,
  City: String,
  Pin: String,
  Qualifications: String,
  Join_date: String,

});





// Create a model from the schema
const Intern = mongoose.model('interndata', InternSchema);

module.exports = Intern;
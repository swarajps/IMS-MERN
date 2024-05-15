const mongoose = require('mongoose');

// Define a schema for your data
const mentorSchema = new mongoose.Schema({
  // Mentor_id: String,
  Mentor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'logindata', required: true},
  Name: String,
  Gender: String,
  Dob: String,
  Email: String,
  Phone: String,
  photo: String,
  State: String,
  City: String,
  PIN: String,
  Employee_code: String,
  Qualifications: String,
  join_date: String,
});

const Mentor = mongoose.model('mentordata', mentorSchema);

module.exports = Mentor;
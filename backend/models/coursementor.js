const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  mentor_id: String,
  course_id: String,
  status: String,

});





// Create a model from the schema
const Cormentor = mongoose.model('CourseMentordata', userSchema);

module.exports = Cormentor;

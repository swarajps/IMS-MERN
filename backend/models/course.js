const mongoose = require('mongoose');

// Define a schema for your data
const CourseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
  duration: String,
  fees: String,

});





// Create a model from the schema
const Course = mongoose.model('coursedata', CourseSchema);

module.exports = Course;
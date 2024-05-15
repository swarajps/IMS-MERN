const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  intern_id: {type: mongoose.Schema.Types.ObjectId, ref: 'interndata', required: true},
  course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'coursedata', required: true},
  status: String,

});

// Create a model from the schema
const CourseAlloc = mongoose.model('CourseAllocationdata', userSchema);

module.exports = CourseAlloc;

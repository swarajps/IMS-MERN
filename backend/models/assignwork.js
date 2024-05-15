const mongoose = require('mongoose');

// Define a schema for your data
const WorkSchema = new mongoose.Schema({
  work_id: {type: mongoose.Schema.Types.ObjectId, ref: 'workdata', required: true},
  intern_id: {type: mongoose.Schema.Types.ObjectId, ref: 'interndata', required: true},
  assign_date: Date,
  status :{
  type: String,
  default: 'pending'
},

});





// Create a model from the schema
const AssignWork = mongoose.model('assignworkdata', WorkSchema);

module.exports = AssignWork;
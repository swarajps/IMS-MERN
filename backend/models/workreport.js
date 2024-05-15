const mongoose = require('mongoose');

// Define a schema for your data
const WorkreportSchema = new mongoose.Schema({
  assign_workid: {type: mongoose.Schema.Types.ObjectId, ref: 'assignworkdata', required: true},
  submission_date: Date,
  work_content: String,
  attach_file: String,
  evaluation_score: String,
  feedback: String,

});





// Create a model from the schema
const WorkReport = mongoose.model('workreportdata', WorkreportSchema);

module.exports = WorkReport;